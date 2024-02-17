import { Configuration, OpenAIApi, ResponseTypes } from "openai-edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function generateImagePrompt(name: string) {
  {
    /* generate a descriptive info for DALLE to generate an image */
  }

  console.log("name from open ai", name);
  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a creative and helpful AI assistant capable of generating interesting thumbnail descriptions for my notes. your output will be fed into the DALLE API to generate a thumbnail. I want the description to be minimalistic and flat styled.",
        },
        {
          role: "user",
          content: `please generate a thumbnail description for my notebook titles: ${name}, don't add any text to the image, make simple and as an icon. use more than two colors.`,
        },
      ],
    });

    const data = await response.json();
    const image_description = data.choices[0].message.content;
    return image_description as string;
  } catch (error) {
    console.log("openai error: ", error);
    return error;
  }
}

export async function generateImage(image_description: string) {
  try {
    const response = await openai.createImage({
      prompt: image_description,
      n: 1,
      size: "256x256",
    });
    const data = await response.json();
    const image_url = data.data[0].url;

    return image_url as string;
  } catch (error) {
    console.log("DALLE error: ", error);
    return error;
  }
}
