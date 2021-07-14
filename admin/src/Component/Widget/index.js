import React, { useState } from "react";
import CheckboxTree from "react-checkbox-tree";
import "react-checkbox-tree/lib/react-checkbox-tree.css";

const nodes = [
  {
    value: "mars",
    label: "Mars",
    children: [
      { value: "mars_phobos", label: "Phobos" },
      { value: "mars_deimos", label: "Deimos" },
    ],
  },
  {
    value: "mars1",
    label: "Mars1",
    children: [
      { value: "mars1_phobos1", label: "Phobos1" },
      { value: "mars1_deimos1", label: "Deimos1" },
    ],
  },
];

const Widget = () => {
  const [checked, setChecked] = useState([]);
  const [expanded, setExpanded] = useState([]);

  const clickChecked = (checked) => {
    setChecked(checked);
  };

  const clickExpanded = (expanded) => {
    setExpanded(expanded);
  };

  return (
    <CheckboxTree
      checkModel
      nodes={nodes}
      checked={checked}
      expanded={expanded}
      onCheck={(checked) => clickChecked(checked)}
      onExpand={(expanded) => clickExpanded(expanded)}
    />
  );
};

export default Widget;
