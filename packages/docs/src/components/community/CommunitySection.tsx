import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Link from 'next/link';

import type { CommunityLinksSection } from '../../interface';

const StyledCommunitySection = styled('div')(
  ({ theme }) => `
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 16px;
    color: ${theme.palette.primary.main}
  `,
);

interface CommunitySectionProps {
  section: CommunityLinksSection;
}

const CommunitySection = ({ section }: CommunitySectionProps) => {
  return (
    <StyledCommunitySection>
      <Typography variant="h3">{section.title}</Typography>
      <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
        {section.links.map(link =>
          link.url.startsWith('http') ? (
            <ListItemButton key={link.url} href={link.url} target="_blank">
              <ListItemText primary={link.title} secondary={link.description} />
            </ListItemButton>
          ) : (
            <ListItemButton component={Link} key={link.url} href={link.url}>
              <ListItemText primary={link.title} secondary={link.description} />
            </ListItemButton>
          ),
        )}
      </List>
    </StyledCommunitySection>
  );
};

export default CommunitySection;
