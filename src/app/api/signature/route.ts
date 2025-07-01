import connectCloudinary from "@/global/configurations/cloudinary";

export async function POST(request: Request) {
  const body = await request.json();
  const { paramsToSign } = body;

  const cloudinary = await connectCloudinary();
  const signature = cloudinary.utils.api_sign_request(
    paramsToSign,
    process.env.CLOUDINARY_API_SECRET as string
  );

  return Response.json({ signature });
}
