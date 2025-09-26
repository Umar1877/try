import { type NextRequest, NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";
import matter from "gray-matter";

// ----------- Helpers -----------

async function ensureDir(dirPath: string) {
  try {
    await fs.mkdir(dirPath, { recursive: true });
  } catch {}
}

async function readJsonArray<T = unknown>(filePath: string): Promise<T[]> {
  try {
    const data = await fs.readFile(filePath, "utf8");
    const parsed = JSON.parse(data);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeJsonArray(filePath: string, data: unknown[]) {
  const tmpPath = `${filePath}.tmp`;
  await fs.writeFile(tmpPath, JSON.stringify(data, null, 2), "utf8");
  await fs.rename(tmpPath, filePath);
}

function slugify(input: string) {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

// ----------- Paths -----------

const DATA_DIR = path.join(process.cwd(), "data");
const JSON_PATH = path.join(DATA_DIR, "projects.json");
const UPLOADS_DIR = path.join(process.cwd(), "public", "uploads", "projects");

const POSTS_DIR = path.join(process.cwd(), "posts"); // Markdown files
const IMAGES_DIR = path.join(process.cwd(), "public", "Images", "PostImages");

// ----------- Markdown Post Mapper -----------

export async function PostMapper() {
  await ensureDir(POSTS_DIR);
  await ensureDir(IMAGES_DIR);

  const files = await fs.readdir(POSTS_DIR);
  const images = await fs.readdir(IMAGES_DIR);

  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(".md", "");
      const filePath = path.join(POSTS_DIR, fileName);
      const fileContent = await fs.readFile(filePath, "utf-8");

      const { data: frontmatter, content } = matter(fileContent);

      return {
        slug,
        frontmatter,
        content,
        images,
      };
    })
  );

  return posts;
}

// ----------- API Handlers -----------

export async function GET() {
  try {
    await ensureDir(DATA_DIR);

    const projects = await readJsonArray(JSON_PATH);
    const posts = await PostMapper();

    return NextResponse.json({ success: true, projects, posts });
  } catch (err) {
    console.error("GET /api/projects error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to load projects or posts" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();

    const id = String(form.get("id") || crypto.randomUUID());
    const projectName = String(form.get("projectName") || "");
    const category = String(form.get("category") || "");
    const client = String(form.get("client") || "");
    const year = String(form.get("year") || "");
    const liveProjectLink = String(form.get("liveProjectLink") || "");
    const clientIntro = String(form.get("clientIntro") || "");
    const problemStatement = String(form.get("problemStatement") || "");
    const solution = String(form.get("solution") || "");
    const result = String(form.get("result") || "");

    const challengesRaw = String(form.get("challenges") || "[]");
    const ourApproachRaw = String(form.get("ourApproach") || "[]");

    let challenges: string[] = [];
    let ourApproach: string[] = [];
    try {
      challenges = JSON.parse(challengesRaw);
      if (!Array.isArray(challenges)) challenges = [];
    } catch {}
    try {
      ourApproach = JSON.parse(ourApproachRaw);
      if (!Array.isArray(ourApproach)) ourApproach = [];
    } catch {}

    let imageUrl: string | null = null;
    const image = form.get("projectImage") as unknown as File | null;
    if (image && typeof image.arrayBuffer === "function" && image.name) {
      await ensureDir(UPLOADS_DIR);
      const ext = path.extname(image.name) || ".png";
      const base =
        slugify(projectName || image.name.replace(ext, "")) || "project";
      const fileName = `${base}-${Date.now()}${ext}`;
      const filePath = path.join(UPLOADS_DIR, fileName);

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);

      imageUrl = `/uploads/projects/${fileName}`;
    }

    await ensureDir(DATA_DIR);
    const list = await readJsonArray<unknown>(JSON_PATH);

    const exists = list.find(
      (p) => {
        if (
          typeof p === "object" &&
          p !== null &&
          "id" in p &&
          "projectName" in p &&
          "client" in p &&
          "year" in p &&
          "category" in p
        ) {
          const proj = p as {
            id: string;
            projectName: string;
            client: string;
            year: string;
            category: string;
          };
          return (
            proj.id === id ||
            (proj.projectName === projectName &&
              proj.client === client &&
              proj.year === year &&
              proj.category === category)
          );
        }
        return false;
      }
    );

    const newRecord = {
      id,
      projectName,
      category,
      client,
      year,
      liveProjectLink,
      clientIntro,
      problemStatement,
      solution,
      result,
      challenges,
      ourApproach,
      imageUrl,
      createdAt: new Date().toISOString(),
    };

    if (exists) {
      return NextResponse.json({
        success: true,
        message: "Project already exists. Skipping duplicate save.",
        item: exists,
      });
    }

    list.push(newRecord);
    await writeJsonArray(JSON_PATH, list);

    return NextResponse.json({ success: true, item: newRecord });
  } catch (err) {
    console.error("POST /api/projects error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to save project" },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    const form = await req.formData();
    const id = String(form.get("id") || "");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    const projectName = String(form.get("projectName") || "");
    const category = String(form.get("category") || "");
    const client = String(form.get("client") || "");
    const year = String(form.get("year") || "");
    const liveProjectLink = String(form.get("liveProjectLink") || "");
    const clientIntro = String(form.get("clientIntro") || "");
    const problemStatement = String(form.get("problemStatement") || "");
    const solution = String(form.get("solution") || "");
    const result = String(form.get("result") || "");

    const challengesRaw = String(form.get("challenges") || "[]");
    const ourApproachRaw = String(form.get("ourApproach") || "[]");

    let challenges: string[] = [];
    let ourApproach: string[] = [];
    try {
      challenges = JSON.parse(challengesRaw);
      if (!Array.isArray(challenges)) challenges = [];
    } catch {}
    try {
      ourApproach = JSON.parse(ourApproachRaw);
      if (!Array.isArray(ourApproach)) ourApproach = [];
    } catch {}

    await ensureDir(DATA_DIR);
    const list = await readJsonArray<unknown>(JSON_PATH);

    const projectIndex = list.findIndex(
      (p) => typeof p === "object" && p !== null && "id" in p && (p as { id: string }).id === id
    );

    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const existingProject = list[projectIndex] as { [key: string]: string };
    let imageUrl = existingProject.imageUrl;

    // Handle new image upload
    const image = form.get("projectImage") as unknown as File | null;
    if (image && typeof image.arrayBuffer === "function" && image.name) {
      await ensureDir(UPLOADS_DIR);

      if (existingProject.imageUrl) {
        try {
          const oldImagePath = path.join(
            process.cwd(),
            "public",
            existingProject.imageUrl
          );
          await fs.unlink(oldImagePath);
        } catch {}
      }

      const ext = path.extname(image.name) || ".png";
      const base =
        slugify(projectName || image.name.replace(ext, "")) || "project";
      const fileName = `${base}-${Date.now()}${ext}`;
      const filePath = path.join(UPLOADS_DIR, fileName);

      const arrayBuffer = await image.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      await fs.writeFile(filePath, buffer);

      imageUrl = `/uploads/projects/${fileName}`;
    }

    const updatedProject = {
      ...existingProject,
      projectName,
      category,
      client,
      year,
      liveProjectLink,
      clientIntro,
      problemStatement,
      solution,
      result,
      challenges,
      ourApproach,
      imageUrl,
      updatedAt: new Date().toISOString(),
    };

    list[projectIndex] = updatedProject;
    await writeJsonArray(JSON_PATH, list);

    return NextResponse.json({ success: true, item: updatedProject });
  } catch (err) {
    console.error("PUT /api/projects error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to update project" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Project ID is required" },
        { status: 400 }
      );
    }

    await ensureDir(DATA_DIR);
    const list = await readJsonArray<unknown>(JSON_PATH);

    const projectIndex = list.findIndex(
      (p) => typeof p === "object" && p !== null && "id" in p && (p as { id: string }).id === id
    );

    if (projectIndex === -1) {
      return NextResponse.json(
        { success: false, message: "Project not found" },
        { status: 404 }
      );
    }

    const project = list[projectIndex] as { imageUrl?: string };
    if (project.imageUrl) {
      try {
        const imagePath = path.join(process.cwd(), "public", project.imageUrl);
        await fs.unlink(imagePath);
      } catch {}
    }

    list.splice(projectIndex, 1);
    await writeJsonArray(JSON_PATH, list);

    return NextResponse.json({
      success: true,
      message: "Project deleted successfully",
    });
  } catch (err) {
    console.error("DELETE /api/projects error:", err);
    return NextResponse.json(
      { success: false, message: "Failed to delete project" },
      { status: 500 }
    );
  }
}
