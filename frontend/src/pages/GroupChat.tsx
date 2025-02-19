import { useState } from "react";
import { Box, CircularProgress, Typography, useMediaQuery, Button } from "@mui/material";
import GroupList from "../components/MyGroups";
import GroupChatWindow from "../components/GroupChatWindow";
import { useGetAllGroupsQuery } from "../services/api";

const GroupChatApp = () => {
  const { data, isLoading, error } = useGetAllGroupsQuery();
  const isMobile = useMediaQuery("(max-width: 768px)"); // Responsive check

  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  return (
    <Box sx={{ display: "flex", width: "100%", height: "100vh" }}>
      {/* Show Groups List when no group is selected (Mobile) OR always on Desktop */}
      {(!isMobile || !selectedGroup) && (
        <Box
          sx={{
            width: isMobile ? "100%" : "30%",
            borderRight: isMobile ? "none" : "1px solid gray",
            p: 2,
            display: selectedGroup && isMobile ? "none" : "block", // Hide on mobile when chat is open
          }}
        >
          {isLoading ? (
            <CircularProgress />
          ) : error ? (
            <Typography color="error">Failed to load groups.</Typography>
          ) : (
            <GroupList groups={data?.data || []} onSelectGroup={setSelectedGroup} />
          )}
        </Box>
      )}

      {/* Show Chat Window when a group is selected (Mobile) OR always on Desktop */}
      {(selectedGroup || !isMobile) && (
        <Box sx={{ flexGrow: 1, display: selectedGroup || !isMobile ? "block" : "none", position: "relative" }}>
          {isMobile && selectedGroup && (
            <Button
              onClick={() => setSelectedGroup(null)}
              sx={{
                position: "absolute",
                top: 10,
                left: 10,
                zIndex: 10,
                bgcolor: "rgba(0,0,0,0.7)",
                color: "#fff",
                "&:hover": { bgcolor: "rgba(0,0,0,0.9)" },
              }}
            >
              ← Back
            </Button>
          )}
          <GroupChatWindow groupId={selectedGroup} />
        </Box>
      )}
    </Box>
  );
};

export default GroupChatApp;
