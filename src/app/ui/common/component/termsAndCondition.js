import React from "react";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
  Typography,
} from "@mui/material";
import { Cookies } from "react-cookie";

function TermsAndConditions(props) {
  const cookies = new Cookies();
  function handleAccept() {
    props.setTermsAndCondition("termsAndCondition", true);
  }
  function handleDisagree() {
    props.setTermsAndCondition("termsAndCondition", props.termsAndCondition);
  }

  const terms = [
    {
      id: 1,
      title: "Acceptance of Terms",
      description:
        "We reserve the right to modify or revise these terms at any time. Your continued use of the website after any changes indicates your acceptance of the modified terms. It is your responsibility to review these terms regularly.",
    },
    {
      id: 2,
      title: "Changes to Terms",
      description:
        "By accessing and using this website, you agree to comply with and be bound by these terms and conditions. If you do not agree to these terms, please refrain from using the website.",
    },
    {
      id: 3,
      title: "User Conduct",
      description:
        "You agree to use the website in a manner consistent with all applicable laws and regulations. You are prohibited from engaging in any conduct that may disrupt or interfere with the website, its services, or other users.",
    },
    {
      id: 4,
      title: "Intellectual Property",
      description:
        "All content on this website, including text, graphics, logos, and images, is the property of [Your Company] and is protected by copyright and other intellectual property laws. You may not reproduce, distribute, or create derivative works without our express written consent.",
    },
    {
      id: 5,
      title: "Privacy Policy",
      description:
        "Our privacy policy, available [link to privacy policy], governs the collection, use, and disclosure of your personal information. By using the website, you consent to the terms of our privacy policy.",
    },
    {
      id: 6,
      title: "Limitation of Liability",
      description:
        "We are not liable for any direct, indirect, incidental, consequential, or punitive damages arising out of your access to or use of the website. The website is provided on an `as-is` and `as-available` basis.",
    },
    {
      id: 7,
      title: "Links to Third-Party Websites",
      description:
        "This website may contain links to third-party websites. We are not responsible for the content or practices of these websites and encourage you to review their terms and privacy policies.",
    },
    {
      id: 8,
      title: "Governing Law",
      description:
        "These terms are governed by the laws of [Your Jurisdiction]. Any legal action or proceeding relating to your access to or use of the website shall be instituted in the courts of [Your Jurisdiction].",
    },
    {
      id: 9,
      title: "Contact Information",
      description:
        "If you have any questions or concerns about these terms, please contact us at [Your Contact Information].",
    },
  ];
  return (
    <>
      {props.isLogin && (
        <Dialog
          open={!props.termsAndCondition.termsAndCondition ?? true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle
            id="responsive-dialog-title"
            sx={{
              backgroundColor: "primary.main",
              color: "secondary.main",
              fontWeight: "bold",
            }}
          >
            Terms and Conditions
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              <>
                {terms.map((item) => {
                  return (
                    <>
                      <Typography
                        variant="subtitle1"
                        sx={{
                          fontWeight: "bold",
                          marginTop: 2,
                          color: "primary.main",
                        }}
                      >
                        {`${item.id}. ${item.title}`}
                      </Typography>
                      <Typography variant="body1" gutterBottom>
                        {item.description}
                      </Typography>
                    </>
                  );
                })}
              </>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={handleDisagree}
              variant="contained"
              color="error"
              sx={{ textAlign: "center", textDecoration: "none" }}
            >
              Disagree
            </Button>
            <Button
              onClick={handleAccept}
              variant="contained"
              color="primary"
              sx={{ textAlign: "center", textDecoration: "none" }}
            >
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </>
  );
}

export default TermsAndConditions;
