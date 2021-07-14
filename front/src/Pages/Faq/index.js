import React, { useState, useEffect } from "react";
import {
  Container,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useSelector, useDispatch } from "react-redux";
import { loadFaqData } from "../../actions/homePageActions";
import Breadcrumb from "../../Component/Breadcrumb";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: "33.33%",
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const Index = (props) => {
  const classes = useStyles();
  const [expanded, setExpanded] = useState(0);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const dispatch = useDispatch();
  const { faqData } = useSelector((state) => ({
    faqData: state.faqData,
  }));
  useEffect(() => {
    const fetchData = () => {
      dispatch(loadFaqData());
    };
    fetchData();
  }, [dispatch]);

  const prepareHtml = (description) => {
    if (description) {
      return { __html: description || "" };
    }
    return { __html: "" };
  };

  return (
    <>
      <Breadcrumb {...props} />
      <section className="page-title green-bg">
        <Container>
          <div className="page-title-contant">
            <h2>FAQ's</h2>
          </div>
        </Container>
      </section>
      {faqData.length > 0 && (
        <section className="main-contant-wrapper">
          <Container>
            <div className="faq-accordian">
              <div className={classes.root}>
                {faqData &&
                  faqData.map((item, key) => (
                    <Accordion
                      expanded={expanded === key}
                      onChange={handleChange(key)}
                      key={key}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                      >
                        <Typography>{item.title}</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography color="textSecondary" className="pt-3">
                          <div
                            dangerouslySetInnerHTML={prepareHtml(
                              item.description
                            )}
                          ></div>
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </div>
            </div>
          </Container>
        </section>
      )}
    </>
  );
};

export default Index;
