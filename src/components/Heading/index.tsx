import { webPath } from "@/router";
import { Stack, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Heading = ({
  title,
  isVisibleFullViewButton,
}: {
  title: string;
  isVisibleFullViewButton?: boolean;
}) => {
  const navigate = useNavigate();

  const handleClickGoToBrandDeal = () => {
    navigate(webPath.brandDeal());
  };

  return (
    <Stack
      sx={{
        alignItems: "center",
        justifyContent: "space-between",
        padding: "16px 16px 12px 16px",
      }}
      direction="row"
    >
      <Stack>
        <Typography variant="h2" sx={{ fontSize: "18px", fontWeight: "700" }}>
          {title}
        </Typography>
      </Stack>
      {isVisibleFullViewButton && (
        <Button
          onClick={handleClickGoToBrandDeal}
          sx={{
            backgroundColor: "transparent",
            color: "#9c9da4",
            textAlign: "center",
            textDecoration: "none",
          }}
        >
          <Typography
            variant="body1"
            sx={{ fontSize: "14px", fontWeight: "600" }}
          >
            전체보기
          </Typography>
        </Button>
      )}
    </Stack>
  );
};
