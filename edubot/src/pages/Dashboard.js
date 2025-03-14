import React from "react";
import { Box, Typography, Grid, Paper, Avatar, IconButton, List, ListItem, ListItemText, Divider, Badge } from "@mui/material";
import { CalendarToday, Download, QueryBuilder, Notifications, EmojiEmotions, SentimentDissatisfied, SentimentNeutral, SentimentSatisfied, SentimentVerySatisfied, Timer, QuestionAnswer, Leaderboard } from "@mui/icons-material";

const styles = {
  card: {
    p: 3,
    borderRadius: 3,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid #ddd",
    bgcolor: "#fff",
    textAlign: "center",
  },
  icon: { fontSize: 50, mt: 1, color: "primary.main" },
};

const Dashboard = () => {
  return (
    <Box sx={{ p: 3,marginTop: 3 ,  minHeight: "100vh" }}>
      <Grid container spacing={3}>
        {/* Total Time Spent & Doubts Asked */}
        <Grid item xs={12} md={2}>
          <Paper sx={styles.card}>
            <Typography variant="h9" fontWeight="bold">Total Time Spent</Typography>
            <Typography variant="h4" color="primary" fontWeight="bold">18h 45m</Typography>
            <Timer sx={styles.icon} />
          </Paper>
          <Paper sx={styles.card}>
            <Typography variant="h9" fontWeight="bold">✅ Total QP's Downloaded</Typography>
            <Typography variant="h3" color="primary" fontWeight="bold">8</Typography>
            <EmojiEmotions sx={styles.icon} />
          </Paper>
        </Grid>

        <Grid item xs={12} md={2}>
          <Paper sx={styles.card}>
            <Typography variant="h9" fontWeight="bold">Total Doubts Asked</Typography>
            <Typography variant="h4" color="secondary" fontWeight="bold">12</Typography>
            <QuestionAnswer sx={styles.icon} />
          </Paper>
          
          <Paper sx={styles.card}>
            <Typography variant="h9" fontWeight="bold">✅ Satisfaction Rate</Typography>
            <Typography variant="h3" color="primary" fontWeight="bold">85%</Typography>
            <EmojiEmotions sx={styles.icon} />
          </Paper>
        

        </Grid>
        

        {/* Leaderboard */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ ...styles.card, textAlign: "left" }}>
            <Typography variant="h6" fontWeight="bold">🏆 Leaderboard</Typography>
            <List>
              {["John Doe", "Andrii Zarypov", "Roman Shauk"].map((user, index) => (
                <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
                  <Avatar sx={{ bgcolor: index === 0 ? "gold" : index === 1 ? "silver" : "brown" }}>{user.charAt(0)}</Avatar>
                  <ListItemText primary={user} secondary={`Score: ${Math.floor(Math.random() * 500)}`} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Learner Progress & Reactions */}
        <Grid item xs={12} md={4}>
          <Paper sx={styles.card}>
            <Typography variant="h6" fontWeight="bold">📊 Learner Reactions</Typography>
            <Box sx={{ display: "flex", justifyContent: "space-around", mt: 2 }}>
              <Badge badgeContent={0} color="error"><SentimentDissatisfied /></Badge>
              <Badge badgeContent={32} color="error"><SentimentNeutral /></Badge>
              <Badge badgeContent={86} color="warning"><SentimentSatisfied /></Badge>
              <Badge badgeContent={144} color="success"><SentimentVerySatisfied /></Badge>
            </Box>
          </Paper>
          <Paper sx={{ ...styles.card, textAlign: "left" }}>
            <Typography variant="h6" fontWeight="bold">📂 Downloaded Question Papers</Typography>
            <List>
              {["Maths QP 2023", "Physics QP 2022", "CS QP 2023"].map((qp, index) => (
                <ListItem key={index} sx={{ borderBottom: "1px solid #ddd" }}>
                  <Download color="primary" />
                  <ListItemText primary={qp} secondary="Downloaded 2 days ago" />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>

     

        
        <Grid container spacing={3}>
        {/* Calendar & Notifications */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ ...styles.card, textAlign: "left" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <Typography variant="h6" fontWeight="bold">📅 Upcoming Events</Typography>
              <CalendarToday />
            </Box>
            <Typography variant="body1" sx={{ mt: 2 }}>📌 Google Analytics Module</Typography>
            <Typography variant="body2" color="text.secondary">Opens at 12:00 AM</Typography>
            <Divider sx={{ my: 2 }} />
            <Typography variant="body1">🎓 Q&A Session with Mentors</Typography>
            <Typography variant="body2" color="text.secondary">3:00 PM - 5:00 PM</Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ ...styles.card, textAlign: "left" }}>
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <Typography variant="h6" fontWeight="bold">🔔 Notifications</Typography>
              <IconButton sx={{ ml: 1 }}><Notifications color="primary" /></IconButton>
            </Box>
            <List>
              <ListItem sx={{ borderBottom: "1px solid #ddd" }}><ListItemText primary="📢 New assignment uploaded" secondary="10 minutes ago" /></ListItem>
              <ListItem sx={{ borderBottom: "1px solid #ddd" }}><ListItemText primary="✅ Your doubt has been answered" secondary="1 hour ago" /></ListItem>
              <ListItem><ListItemText primary="📝 Exam results are available" secondary="1 day ago" /></ListItem>
            </List>
          </Paper>
        </Grid>
        </Grid> 

        {/* Notifications */}
        
      </Grid>
    </Box>
  );
};

export default Dashboard;
