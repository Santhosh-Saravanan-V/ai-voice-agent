import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const saveMessage = mutation({
  args: {
    id: v.string(),
    role: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("messages", args);
  },
});


export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages").collect();
  },
});
