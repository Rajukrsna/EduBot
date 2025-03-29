import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import AutoFixHighRoundedIcon from '@mui/icons-material/AutoFixHighRounded';
import ChatRoundedIcon from '@mui/icons-material/ChatRounded';
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded';
import DescriptionRoundedIcon from '@mui/icons-material/DescriptionRounded';
import logo3 from '../logo4.svg';

const items = [
  {
    icon: <DescriptionRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'AI QP Generator',
    description:
      'Generate high-quality question papers instantly. Customize questions based on difficulty, topics, and exam patterns.',
  },
  {
    icon: <ChatRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Doubt Solver Bot',
    description:
      'Get instant answers to academic queries. Our AI-powered bot provides explanations, references, and step-by-step solutions.',
  },
  {
    icon: <GroupsRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Collaborative AI Chat',
    description:
      'Form study groups with AI as an interactive member. Discuss topics, get insights, and engage in intelligent discussions.',
  },
  {
    icon: <AutoFixHighRoundedIcon sx={{ color: 'text.secondary' }} />,
    title: 'Smart Learning Assistance',
    description:
      'EduBot adapts to your learning needs, offering personalized study recommendations and interactive support.',
  },
];

export default function Content() {
  return (
    <Stack
      sx={{ flexDirection: 'column', alignSelf: 'center', gap: 4, maxWidth: 450 }}
    >
      {/* EduBot Logo */}
      <Box sx={{ display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
        <img src={logo3} alt="EduBot Logo" style={{ width: '120px', height: 'auto' }} />
      </Box>

      {/* Feature List */}
      {items.map((item, index) => (
        <Stack key={index} direction="row" sx={{ gap: 2 }}>
          {item.icon}
          <div>
            <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {item.description}
            </Typography>
          </div>
        </Stack>
      ))}
    </Stack>
  );
}
