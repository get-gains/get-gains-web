import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { API_URL } from "@/lib/constants";
import {
  ADMIN_REFRESH_COOKIE,
  clearAdminSession,
  getAdminSession,
  refreshAdminAccessToken,
} from "@/lib/admin/auth.server";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

interface ProxyContext {
  params: Promise<{ path: string[] }>;
}

const hasBody = (method: HttpMethod): boolean =>
  method === "POST" || method === "PATCH";

const isMultipart = (contentType: string | null): boolean =>
  contentType?.startsWith("multipart/form-data") ?? false;

async function handleProxy(
  method: HttpMethod,
  req: NextRequest,
  { params }: ProxyContext,
): Promise<NextResponse> {
  const { path } = await params;
  const targetPath = path.join("/");
  const query = req.nextUrl.search;

  const cookieStore = await cookies();
  let session = await getAdminSession();

  if (!session) {
    const refreshToken = cookieStore.get(ADMIN_REFRESH_COOKIE)?.value;
    if (refreshToken) {
      session = await refreshAdminAccessToken(refreshToken);
    }
    if (!session) {
      await clearAdminSession();
      return NextResponse.json(
        { errors: [{ message: "Unauthorized" }] },
        { status: 401 },
      );
    }
  }

  const requestContentType = req.headers.get("content-type");
  const multipart = isMultipart(requestContentType);

  const requestBody = hasBody(method)
    ? multipart
      ? req.body
      : await req.text()
    : undefined;

  const forwardRequest = async (token: string): Promise<Response> => {
    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    const init: RequestInit & { duplex?: "half" } = {
      method,
      headers,
      cache: "no-store",
    };

    if (multipart) {
      init.duplex = "half";
      headers["Content-Type"] = requestContentType!;
    }

    if (requestBody !== undefined) {
      if (!multipart) {
        headers["Content-Type"] = requestContentType || "application/json";
      }
      init.body = requestBody;
    }

    return fetch(`${API_URL}/admin/${targetPath}${query}`, init);
  };

  let response = await forwardRequest(session.accessToken);

  if (response.status === 401) {
    const refreshed = await refreshAdminAccessToken(session.refreshToken);
    if (!refreshed) {
      await clearAdminSession();
      return NextResponse.json(
        { errors: [{ message: "Session expired" }] },
        { status: 401 },
      );
    }
    response = await forwardRequest(refreshed.accessToken);
  }

  const responseBody = await response.text();
  const responseContentType =
    response.headers.get("content-type") || "application/json";

  return new NextResponse(responseBody, {
    status: response.status,
    headers: { "Content-Type": responseContentType },
  });
}

export async function GET(
  req: NextRequest,
  context: ProxyContext,
): Promise<NextResponse> {
  return handleProxy("GET", req, context);
}

export async function POST(
  req: NextRequest,
  context: ProxyContext,
): Promise<NextResponse> {
  return handleProxy("POST", req, context);
}

export async function PATCH(
  req: NextRequest,
  context: ProxyContext,
): Promise<NextResponse> {
  return handleProxy("PATCH", req, context);
}

export async function DELETE(
  req: NextRequest,
  context: ProxyContext,
): Promise<NextResponse> {
  return handleProxy("DELETE", req, context);
}
