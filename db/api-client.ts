// we will create here an api client that call all the backend and save responce. when we need to use it to different pages we need to use the object and the methods

// we need the videoData type because of that we add this two lines at the end
import { IVideo } from "@/models/Video";
export type VideoFormData = Omit<IVideo, "_id">

type FetchOptions = {
    method?: "GET" | "POST" | "PUT" | "DELETE",
    body?: any,
    headers?: Record<string, string>
}

class ApiClient{
    private async fetch<T>(
        endpoint: string,
        options: FetchOptions = {}
    ): Promise<T> {
        const {method = "GET", body, headers = {}} = options

        const defaultHeaders = {
            "Content-Type": "application/json",
            ...headers,
        }

        const response = await fetch(`/api${endpoint}`, {
            method,
            headers: defaultHeaders,
            body: body? JSON.stringify(body): undefined,
        })

        if(!response.ok){
            throw new Error(await response.text());
        }

        return response.json()
    }


    async getVideos(){
        return this.fetch("/videos");
    }

    async createVideo(videoData: VideoFormData){
        return this.fetch("/videos", {
            method: "POST",
            body: videoData
        })
    }
}

export const apiClient = new ApiClient();