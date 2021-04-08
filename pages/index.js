import Head from "next/head";
import useSWR from "swr";
import { Box, Container, Wrap, WrapItem, Text, Center } from "@chakra-ui/react";
import {
  Video,
  Transformation,
  CloudinaryContext,
  Placeholder,
} from "cloudinary-react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

export default function Home() {
  const { data, error } = useSWR("/api/getAllVideos");

  if (error) return <div>failed to load</div>;
  if (!data) return <div>loading...</div>;

  return (
    <Box overflow="hidden" pb="3rem" bg="gray.100" px="1rem" minH="100vh">
      {" "}
      <Head>
        <title> Next.js Video Gallery </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>{" "}
      <Container>
        {" "}
        <Text
          as="h1"
          fontWeight="semibold"
          mb="1rem"
          textAlign="center"
          fontSize="4xl"
        >
          Next.js Video Gallery
        </Text>
      </Container>
      <Wrap spacing="1rem" justify="center">
        {data !== undefined &&
          data.resources.map((video) => (
            <WrapItem
              key={video.public_id}
              boxShadow="base"
              rounded="20px"
              overflow="hidden"
              _hover={{ boxShadow: "dark-lg" }}
            >
              <Video
                publicId={video.public_id}
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}
                secure="true"
                controls
                fallbackContent="Your browser does not support HTML5 video tags."
                format="webm"
              >
                <Transformation width="640" crop="scale" />
              </Video>
            </WrapItem>
          ))}
      </Wrap>
      <Container maxW="container.md" my="2rem">
        <Text
          fontWeight="semibold"
          mb="1rem"
          textAlign="center"
          textDecoration="underline"
          fontSize="3xl"
        >
          Video Gallery with Awesome Slider
        </Text>
        <Box>
          <AwesomeSlider>
            {data !== undefined &&
              data.resources.map((video) => (
                <div key={video.public_id}>
                  <Video
                    publicId={video.public_id}
                    cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD}
                    secure="true"
                    controls
                  ></Video>
                </div>
              ))}
          </AwesomeSlider>
        </Box>
      </Container>
    </Box>
  );
}
