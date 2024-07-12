import { Server as NetServer, Socket } from "net";
import { NextApiResponse } from "next";
import { Server as SockerIOServer } from "socket.io";

import { Channel, Member, Message, Profile, Workspace } from "@prisma/client";

export type WorkspaceWithMembersWithProfiles = Workspace & {
  members: (Member & { profile: Profile })[];
};

export type WorkspaceWithChannels = Workspace & {
  channels: Channel[];
};

export type MessageWithMembersWithProfiles = Message & {
  member: Member & {
    profile: Profile;
  };
};

export type NextApiResponseServerIo = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SockerIOServer;
    };
  };
};
