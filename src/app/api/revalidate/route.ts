import { NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST(request: Request) {
  const secret = process.env.REVALIDATE_SECRET;
  if (!secret) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 500 });
  }

  const providedSecret = request.headers.get("x-revalidate-secret");
  if (providedSecret !== secret) {
    return NextResponse.json({ ok: false, error: "unauthorized" }, { status: 401 });
  }

  try {
    const body = (await request.json()) as {
      tags?: string[];
      paths?: string[];
    };

    const revalidated: string[] = [];

    for (const tag of body.tags ?? []) {
      revalidateTag(tag, { expire: 0 });
      revalidated.push(`tag:${tag}`);
    }

    for (const path of body.paths ?? []) {
      revalidatePath(path, "page");
      revalidated.push(`path:${path}`);
    }

    return NextResponse.json({ ok: true, revalidated });
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_body" }, { status: 400 });
  }
}
