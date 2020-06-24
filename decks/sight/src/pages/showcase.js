/** @jsx jsx */
import { jsx } from "theme-ui"
import { Link } from "gatsby"
import {
  Container,
  Flex,
  Box,
  Button,
  Card,
  Heading,
  Text,
  Spinner,
} from "@theme-ui/components"

import { useQuery } from "@apollo/react-hooks"

import { ThemeWrapper } from "../components/ThemeWrapper"
import { Seo } from "../components/Seo"
import { Header } from "../components/Header"
import { Logo } from "../components/Logo"
import { ThemeThumbnail } from "../components/ThemeThumbnail"
import { TopNav } from "../components/TopNav"
import { Footer } from "../components/Footer"

import { useSiteMetadata } from "../data/useSiteMetadata"

import { GET_ALL_THEMES } from "../utils/graphql"

const showcase = () => {
  const { loading, error, data } = useQuery(GET_ALL_THEMES, {
    variables: { theme_is_private: false },
  })

  const {
    site: {
      siteMetadata: {
        author,
        title,
        description,
        url,
        ogImage,
        keywords,
        lang,
      },
    },
  } = useSiteMetadata()

  return (
    <ThemeWrapper>
      <Seo
        author={author}
        title={title}
        titleTemplate="showcase"
        description={description}
        url={url}
        ogImage={ogImage}
        path="/showcase"
        keywords={keywords}
        lang={lang}
      />

      <Header
        left={
          <Flex>
            <Logo />
            <TopNav />
          </Flex>
        }
      />

      <main
        sx={{
          minHeight: theme => `calc(100vh - ${theme.sizes.doubleHeader}px)`,
        }}
      >
        <Container>
          <Flex sx={{ flexWrap: "wrap", height: "100%", mb: 5 }}>
            <Box
              sx={{
                mr: 3,
                flex: "1 1 auto",
              }}
            >
              <Heading as="h1" variant="styles.h1" sx={{ mb: 3 }}>
                Showcase
              </Heading>
            </Box>
            <Box sx={{ justifyContent: "flex-end", mb: 5 }}>
              <Button as={Link} to="/editor">
                Create new theme
              </Button>
            </Box>
          </Flex>
          {loading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                p: 4,
              }}
            >
              <Spinner />
            </Box>
          )}
          {error && <Text>{`${error}`}</Text>}
          {!loading && !error && (
            <Flex
              sx={{
                flexWrap: "wrap",
                ml: theme => `-${theme.space[2]}px`,
                mr: theme => `-${theme.space[2]}px`,
              }}
            >
              {data.getAllThemes.map((item, index) => {
                // Different to your-themes. Dont render the card if there's errors
                try {
                  JSON.parse(item.theme_object)
                  return (
                    <Box
                      key={index}
                      sx={{
                        display: "flex",
                        flex: "1 1 auto",
                        flexDirection: "column",
                        mb: 3,
                        maxWidth: ["100%", "100%", "50%", "50%"],
                        width: ["100%", "100%", "50%", "50%"],
                      }}
                    >
                      <Link
                        to={`/editor?theme_id=${item.ref}`}
                        sx={{
                          textDecoration: "none",
                          display: "flex",
                          flex: "1 1 auto",
                          flexDirection: "column",
                          m: theme => `0px ${theme.space[2]}px`,
                          minHeight: "1px",
                        }}
                      >
                        <Card
                          sx={{
                            backgroundColor: "darken",
                            display: "flex",
                            flex: "1 1 auto",
                            flexDirection: "column",
                            minHeight: "1px",
                          }}
                        >
                          <ThemeThumbnail
                            themeObject={item.theme_object}
                            themeRef={item.ref}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flex: "1 1 auto",
                              flexDirection: "column",
                              p: 3,
                            }}
                          >
                            <Text sx={{ color: "text", fontSize: 0, mb: 2 }}>
                              {item.theme_author}
                            </Text>
                            <Heading
                              as="h2"
                              variant="styles.h2"
                              sx={{ color: "text", mb: 2 }}
                            >
                              {item.theme_name}
                            </Heading>
                            <Text sx={{ color: "lighten" }}>
                              {item.theme_description}
                            </Text>
                          </Box>
                          <Box sx={{ p: 3 }}>
                            <Text
                              sx={{
                                color: "muted",
                                textTransform: "capitalize",
                                mb: 4,
                              }}
                            >
                              Style:{" "}
                              <Box as="span" sx={{ color: "text" }}>
                                {item.theme_style}
                              </Box>
                            </Text>
                            <Text
                              sx={{
                                color: "secondary",
                                textDecoration: "underline",
                              }}
                            >
                              View Theme
                            </Text>
                          </Box>
                        </Card>
                      </Link>
                    </Box>
                  )
                } catch (e) {
                  if (e instanceof SyntaxError) {
                    // console.error("Skin UI syntax error with ref: ", item.ref)
                  }
                }
              })}
            </Flex>
          )}
        </Container>
      </main>
      <Footer />
    </ThemeWrapper>
  )
}

export default showcase
