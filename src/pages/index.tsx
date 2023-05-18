import { Title, Text, Stack, Button, Center, createStyles } from "@mantine/core";
import PlexoBackground from "components/resources/PlexoLogoBackground";

const useStyles = createStyles(theme => ({
  container: {
    position: "relative",
    overflow: "hidden",
    minHeight: 600,
    background: theme.colors.dark[8],
    color: theme.colors.dark[0],
  },
  textContainer: {
    position: "absolute",
    bottom: 100,
    width: "100%",
  },
  title: {
    lineHeight: 1,
    [theme.fn.smallerThan("sm")]: {
      fontSize: 60,
    },
  },
  description: {
    [theme.fn.smallerThan("sm")]: {
      fontSize: 18,
    },
  },
}));

const Plexo = () => {
  const { classes } = useStyles();

  return (
    <Center h={"100vh"} className={classes.container}>
      <PlexoBackground />
      <Stack p={20} spacing={"xl"} align="center" className={classes.textContainer}>
        <Title order={1} size={80} className={classes.title}>
          Plexo
        </Title>
        <Stack spacing={0} align="center">
          <Text size={"xl"} align="center" className={classes.description}>
            A new kind of collaboration:
          </Text>
          <Text size={"xl"} align="center" className={classes.description}>
            Open-Source Project Management System for modern innovators
          </Text>
        </Stack>
        <Button data-umami-event="Demo button" size="md" w={"fit-content"}>
          Explore our demo
        </Button>
      </Stack>
    </Center>
  );
};

export default Plexo;
