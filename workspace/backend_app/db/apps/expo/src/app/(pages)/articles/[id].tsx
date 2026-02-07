import type { ComponentProps } from "react";
import type { View } from "react-native";
import React from "react";
import { Dimensions, Image, ScrollView, Text } from "react-native";
import RenderHtml from "react-native-render-html";
import { router, useLocalSearchParams } from "expo-router";

import { colors } from "@corecount/tailwind-config/constants";

import { ChevronLeft, Placeholder } from "~/assets/icons";
import { typography } from "~/components/styled/StyledText";
import TitleBar from "~/components/Title";
import IconButton from "~/components/ui/IconButton";
import GlobalLayout from "~/components/ui/GlobalLayout";
import { api } from "~/context/useTRPC";

type ArticleProps = ComponentProps<typeof View> & {
  id: string;
};

const Article = ({ ...props }: ArticleProps) => {
  const { id } = useLocalSearchParams();

  // @ts-ignore
  const { data: article, isFetched } = api.articles.byId.useQuery({ id });
  const screenDimX = Dimensions.get("screen").width;

  return (
    <GlobalLayout>
      <ScrollView>
        {isFetched && (
          <>
            <TitleBar
              iconLeft={
                <IconButton
                  shape={"circle"}
                  onPress={() => router.back()}
                  size={"small"}
                  icon={ChevronLeft}
                />
              }
              // iconRight={<IconButton shape={"circle"} size={"small"} icon={Placeholder} />}
            >
              {article.title}
            </TitleBar>

            {article.image && (
              <Image
                src={article.image}
                style={{ width: screenDimX - 24, height: 300 }}
                className={"aspect-ratio rounded-t-2xl"}
              />
            )}

            <RenderHtml
              systemFonts={["Chillax-Regular"]}
              contentWidth={screenDimX - 24}
              source={{ html: article.content }}
              baseStyle={{ fontFamily: "Chillax-Regular" }}
              tagsStyles={mixedStyle}
              enableExperimentalMarginCollapsing={true}
              enableExperimentalBRCollapsing={true}
              enableExperimentalGhostLinesPrevention={true}
              defaultTextProps={{
                style: {
                  fontFamily: "Chillax-Regular",
                  color: colors.dark["30"],
                },
              }}
            />
          </>
        )}
      </ScrollView>
    </GlobalLayout>
  );
};

const mixedStyle = {
  h1: {
    fontFamily: "Chillax-Semibold",
  },
};

export default Article;
