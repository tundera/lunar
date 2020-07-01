/** @jsx jsx */
import { useContext, useState, memo, Fragment, useEffect } from "react"
import PropTypes from "prop-types"
import { jsx } from "theme-ui"

import {
  Flex,
  Box,
  Text,
  Button,
  Label,
  Input,
  Textarea,
  Radio,
  Divider,
  Spinner,
} from "@theme-ui/components"
import copy from "clipboard-copy"

import { useMutation } from "@apollo/react-hooks"

import { IconButton } from "../IconButton"
import { SkinContext } from "../../context"

import { checkAndReplaceQuotes } from "../../utils/checkAndReplaceQuotes"

import {
  COPY_ICON,
  DOWNLOAD_ICON,
  DELETE_THEME_ICON,
} from "../../utils/iconPaths"

import { useSiteMetadata } from "../../data/useSiteMetadata"
import { SET_DATABASE_THEME_BY_ID } from "../../utils/const"
import { UPDATE_THEME_BY_ID, DELETE_THEME_BY_ID } from "../../utils/graphql"

const THEME_STYLE_LIGHT = "light"
const THEME_STYLE_DARK = "dark"

export const Settings = memo(({ isElementVisible }) => {
  const {
    site: {
      siteMetadata: { url },
    },
  } = useSiteMetadata()

  const { state, dispatch } = useContext(SkinContext)

  const [updateThemeById, { loading, error }] = useMutation(
    UPDATE_THEME_BY_ID,
    {
      onCompleted({ updateThemeById }) {
        dispatch({
          type: SET_DATABASE_THEME_BY_ID,
          databaseThemeById: {
            ...updateThemeById,
          },
        })
      },
    }
  )

  const [deleteThemeById] = useMutation(DELETE_THEME_BY_ID, {
    onCompleted() {
      location.search = null
    },
  })

  const handleSave = () => {
    updateThemeById({
      variables: {
        theme_id: state.databaseThemeById.ref,
        theme_name: formValues.theme_name,
        theme_description: formValues.theme_description,
        theme_style: formValues.theme_style,
        theme_object: state.defaultThemeObject,
      },
    })
  }

  const handleDelete = () => {
    deleteThemeById({
      variables: {
        theme_id: state.databaseThemeById.ref,
      },
    })
  }

  const [formValues, setFormValues] = useState({
    theme_name: "",
    theme_description: "",
    theme_style: "",
  })

  useEffect(() => {
    setFormValues({
      theme_name: state.databaseThemeById.theme_name,
      theme_description: state.databaseThemeById.theme_description,
      theme_style: state.databaseThemeById.theme_style,
    })
  }, [state.databaseThemeById])

  return (
    <Fragment>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            flex: "1 1 auto",
          }}
        >
          <Label>Theme Name</Label>
          <Input
            name="theme-name"
            tabIndex={isElementVisible ? 0 : -1}
            defaultValue={formValues.theme_name}
            onChange={event =>
              setFormValues({
                ...formValues,
                theme_name: event.target.value,
              })
            }
          />
          <Label>Theme Description</Label>
          <Textarea
            name="theme-description"
            tabIndex={isElementVisible ? 0 : -1}
            defaultValue={formValues.theme_description}
            onChange={event =>
              setFormValues({
                ...formValues,
                theme_description: event.target.value,
              })
            }
          />
          <Text
            sx={{
              color: "muted",
              fontSize: 0,
              fontWeight: "bold",
              mb: 2,
            }}
          >
            Theme Style
          </Text>

          <Box
            sx={{
              display: "flex",
            }}
          >
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
                mr: 2,
              }}
            >
              <Label
                title="Theme style light"
                htmlFor={THEME_STYLE_LIGHT}
                sx={{
                  fontWeight: "body",
                }}
              >
                <Radio
                  tabIndex={isElementVisible ? 0 : -1}
                  id={THEME_STYLE_LIGHT}
                  name="theme-style"
                  checked={
                    formValues.theme_style === THEME_STYLE_LIGHT ? true : false
                  }
                  onChange={event =>
                    setFormValues({
                      ...formValues,
                      theme_style: THEME_STYLE_LIGHT,
                    })
                  }
                  sx={{
                    mr: 1,
                  }}
                />
                Light
              </Label>
            </Box>
            <Box
              sx={{
                alignItems: "center",
                display: "flex",
              }}
            >
              <Label
                title="Theme style dark"
                htmlFor={THEME_STYLE_DARK}
                sx={{
                  fontWeight: "body",
                }}
              >
                <Radio
                  tabIndex={isElementVisible ? 0 : -1}
                  id={THEME_STYLE_DARK}
                  name="theme-style"
                  checked={
                    formValues.theme_style === THEME_STYLE_DARK ? true : false
                  }
                  onChange={event =>
                    setFormValues({
                      ...formValues,
                      theme_style: THEME_STYLE_DARK,
                    })
                  }
                  sx={{
                    mr: 1,
                  }}
                />
                Dark
              </Label>
            </Box>
          </Box>

          <Divider />

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              mb: 1,
            }}
          >
            <IconButton
              tabIndex={isElementVisible ? 0 : -1}
              variant="ghostIcon"
              title="Copy Theme UI object"
              aria-label="Copy Theme UI object"
              iconPath={COPY_ICON}
              onClick={() =>
                copy(
                  `export default \n${checkAndReplaceQuotes(
                    state.defaultThemeObject
                  )}`
                )
              }
              sx={{
                mr: 1,
              }}
            />
            <Text
              sx={{
                color: "muted",
                fontSize: 0,
              }}
            >
              Copy Theme UI object
            </Text>
          </Box>

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
            }}
          >
            <IconButton
              tabIndex={isElementVisible ? 0 : -1}
              as="a"
              download="skin-ui-source.zip"
              href={`${url}/skin-ui-source.zip`}
              variant="ghostIcon"
              title="Download source"
              aria-label="Download source"
              iconPath={DOWNLOAD_ICON}
              sx={{
                mr: 1,
              }}
            />
            <Text
              sx={{
                color: "muted",
                fontSize: 0,
              }}
            >
              Download source
            </Text>
          </Box>

          <Divider />

          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              mb: 4,
            }}
          >
            <IconButton
              tabIndex={isElementVisible ? 0 : -1}
              onClick={() => handleDelete()}
              variant="ghostIcon"
              title="Delete Theme"
              aria-label="Delete Theme"
              iconPath={DELETE_THEME_ICON}
              sx={{
                mr: 1,
              }}
            />
            <Text
              sx={{
                color: "muted",
                fontSize: 0,
              }}
            >
              Delete Theme
            </Text>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            mb: 2,
          }}
        >
          {loading ? (
            <Flex
              sx={{
                alignItems: "center",
                backgroundColor: "primary",
                justifyContent: "center",
                opacity: 0.5,
                p: 1,
              }}
            >
              <Spinner sx={{ color: "text", width: 30, height: 30 }} />
            </Flex>
          ) : (
            <Button
              tabIndex={isElementVisible ? 0 : -1}
              title="Save Theme UI object"
              onClick={() => handleSave()}
            >
              Save
            </Button>
          )}
        </Box>
      </Box>
    </Fragment>
  )
})

Settings.propTypes = {
  /** parent state isElementVisible */
  isElementVisible: PropTypes.bool,
}
