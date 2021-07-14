import { useEffect } from "react";
import { useSelector } from "react-redux";

const Index = (props) => {
  const { setting } = useSelector((state) => ({
    setting: state.setting,
  }));

  const { title } = props;
  useEffect(() => {
    document.title = setting.sort_name + " | " + title;
  }, [title, setting]);

  return null;
};

export default Index;
