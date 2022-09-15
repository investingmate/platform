import clsx from "clsx";
import { useLayout } from "../core";

const Content = ({ children }) => {
  const { classes } = useLayout();

  return (
    <div
      id="im_content_container"
      className={clsx(classes.contentContainer.join(" "))}
    >
      {children}
    </div>
  );
};

export { Content };
