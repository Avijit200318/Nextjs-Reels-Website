import { authOptions } from "@/db/auth";
import { connectToDb } from "@/db/db";
import videoModel, { IVideo } from "@/models/Video";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function GET(){
    try{
        await connectToDb;
        const videos = await videoModel.find({}).sort({createdAt: -1}).lean();

        if(!videos || videos.length === 0){
            return NextResponse.json([], {status: 200});
        }

        return NextResponse.json(videos, {status: 200});
    }catch(error){
        return NextResponse.json({error: "Failed to fetch videos"}, {status: 500});
    }
}

export async function POST(request: NextRequest){
    try{
        // to check if the user is already loged in we have a builtin method in nextjs getServerSession and we have to add authOptions inside it
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({error: "Unauthorized"}, {status: 401});
        }

        await connectToDb();

        const body:IVideo = await request.json();

        if(!body.title || !body.description || !body.videoUrl || !body.thumbnailUrl){
            return NextResponse.json({error: "Missing required fileds"}, {status: 400});
        }

        const videoData = {
            ...body,
            controls: body?.controls ?? true,
            transformation: {
            height: 1920,
            width: 1080,
            quality: body.transformation?.quality ?? 100
            }
        };

        const newVideo = await videoModel.create(videoData);

        return NextResponse.json(newVideo);
    }catch(error){
        return NextResponse.json({error: "Failed to create video"}, {status: 500});
    }
}