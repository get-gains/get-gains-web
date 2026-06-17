"use client";
import * as React from "react";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { adminFetchClient } from "@/lib/admin/api-client";
import type { Mission, Partner } from "@/lib/admin/types";
import { MissionForm } from "./mission-form";
import { DrawWinnersDialog } from "./draw-winners-dialog";
import { PartnerForm } from "../partners/partner-form";

interface MissionsResponse {
  missions: Mission[];
}

interface PartnersResponse {
  partners: Partner[];
}

export default function AdminMissionsPage(): React.JSX.Element {
  const [activeTab, setActiveTab] = useState<string>("missions");
  const [missions, setMissions] = useState<Mission[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState<string>("");
  const [missionFormOpen, setMissionFormOpen] = useState<boolean>(false);
  const [partnerFormOpen, setPartnerFormOpen] = useState<boolean>(false);
  const [editingMission, setEditingMission] = useState<Mission | null>(null);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [drawingMission, setDrawingMission] = useState<Mission | null>(null);

  const fetchAll = async (): Promise<void> => {
    try {
      const [missionsRes, partnersRes] = await Promise.all([
        adminFetchClient<MissionsResponse>("/missions?limit=100"),
        adminFetchClient<PartnersResponse>("/partners?limit=100"),
      ]);
      setMissions(missionsRes.missions);
      setPartners(partnersRes.partners);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchAll();
  }, []);

  const handleDeleteMission = async (id: string): Promise<void> => {
    if (!confirm("Are you sure you want to close this mission?")) return;
    await adminFetchClient(`/admin/missions/${id}`, { method: "DELETE" });
    void fetchAll();
  };

  const handleDeletePartner = async (id: string): Promise<void> => {
    if (!confirm("Are you sure you want to delete this partner?")) return;
    await adminFetchClient(`/admin/partners/${id}`, { method: "DELETE" });
    void fetchAll();
  };

  const filteredMissions = missions.filter((m) =>
    m.title.toLowerCase().includes(search.toLowerCase()),
  );

  const filteredPartners = partners.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase()),
  );

  const openEditMission = (mission: Mission): void => {
    setEditingMission(mission);
    setMissionFormOpen(true);
  };

  const openEditPartner = (partner: Partner): void => {
    setEditingPartner(partner);
    setPartnerFormOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Missions & Partners</h1>
        <div className="flex gap-2">
          {activeTab === "missions" ? (
            <Button onClick={() => setMissionFormOpen(true)}>
              New Mission
            </Button>
          ) : (
            <Button onClick={() => setPartnerFormOpen(true)}>
              New Partner
            </Button>
          )}
        </div>
      </div>

      <Input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-sm"
      />

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="missions">Missions</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
        </TabsList>

        <TabsContent value="missions" className="space-y-4">
          {loading ? (
            <p className="text-muted-foreground">Loading missions...</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Partner</TableHead>
                    <TableHead>Reward</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMissions.map((mission) => (
                    <TableRow key={mission.id}>
                      <TableCell className="font-medium">
                        {mission.title}
                      </TableCell>
                      <TableCell>{mission.partner?.name ?? "—"}</TableCell>
                      <TableCell>
                        <Badge variant="secondary">{mission.rewardType}</Badge>
                      </TableCell>
                      <TableCell>
                        {mission.isClosed ? (
                          <Badge variant="destructive">Closed</Badge>
                        ) : (
                          <Badge variant="default">Active</Badge>
                        )}
                      </TableCell>
                      <TableCell className="space-x-2 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditMission(mission)}
                        >
                          Edit
                        </Button>
                        {mission.rewardType === "RAFFLE" &&
                          !mission.isClosed && (
                            <Button
                              variant="secondary"
                              size="sm"
                              onClick={() => setDrawingMission(mission)}
                            >
                              Draw
                            </Button>
                          )}
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => void handleDeleteMission(mission.id)}
                        >
                          Close
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>

        <TabsContent value="partners" className="space-y-4">
          {loading ? (
            <p className="text-muted-foreground">Loading partners...</p>
          ) : (
            <div className="rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Missions</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPartners.map((partner) => (
                    <TableRow key={partner.id}>
                      <TableCell className="font-medium">
                        {partner.name}
                      </TableCell>
                      <TableCell>{partner.missionCount}</TableCell>
                      <TableCell className="space-x-2 text-right">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => openEditPartner(partner)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => void handleDeletePartner(partner.id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </TabsContent>
      </Tabs>

      <MissionForm
        mission={editingMission}
        partners={partners}
        open={missionFormOpen}
        onOpenChange={(open) => {
          setMissionFormOpen(open);
          if (!open) setEditingMission(null);
        }}
        onSaved={fetchAll}
      />

      <PartnerForm
        partner={editingPartner}
        open={partnerFormOpen}
        onOpenChange={(open) => {
          setPartnerFormOpen(open);
          if (!open) setEditingPartner(null);
        }}
        onSaved={fetchAll}
      />

      {drawingMission && (
        <DrawWinnersDialog
          mission={drawingMission}
          open
          onOpenChange={(open) => {
            if (!open) setDrawingMission(null);
          }}
          onDrawn={fetchAll}
        />
      )}
    </div>
  );
}
