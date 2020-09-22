import React, { useEffect, useState } from "react";
import { Card, Content, Loader } from "react-bulma-components";
import { getLinkMeta } from "../sdk";
export const MetaLink = ({ url }) => {
  let [linkMeta, setLinkMeta] = useState<{
    title: string;
    description: string;
    image: string;
    favicon: string;
  }>();
  let [loading, setLoading] = useState(true);
  useEffect(() => {
    getLinkMeta(url.expanded_url)
      .then((r) => {
        setLinkMeta(r);
        setLoading(false);
      })
      .catch((e) => {});
  }, []);
  return (
    <>
      {loading ? (
        <>
          <Loader></Loader>
          <a href={url.expanded_url} target={"_blank"}>
            {url.url}
          </a>
        </>
      ) : null}
      {!loading ? (
        <Card style={{ borderRadius: 10 }}>
          {linkMeta?.image || linkMeta?.favicon ? (
            <Card.Image
              src={
                linkMeta?.image && linkMeta?.image.includes("http")
                  ? linkMeta?.image
                  : linkMeta?.favicon
              }
            />
          ) : null}
          <Card.Content>
            <Content>
              <p>
                <a href={url.url} target={"_blank"}>
                  <strong>{linkMeta?.title}</strong>
                </a>
              </p>
              <p>
                <small>{linkMeta?.description}</small>
              </p>
            </Content>
          </Card.Content>
        </Card>
      ) : null}
    </>
  );
};
