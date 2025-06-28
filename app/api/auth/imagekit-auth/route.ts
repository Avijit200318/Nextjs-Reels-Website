import { getUploadAuthParams } from "@imagekit/next/server"

export async function GET() {

    try {
        const authenticationParameters = getUploadAuthParams({
            privateKey: process.env.IMAGEKIT_PRIVATE_KEY as string,
            publicKey: process.env.NEXT_PUBLIC_PUBLIC_KEY as string,

        })

        // console.log("authkeys: ", authenticationParameters);
        return Response.json(authenticationParameters)
    } catch (error) {
        return Response.json(
            {error: "Authentication for Imagekit failed"},
            {status: 500}
        )
    }
}