import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AutorenewIcon from '@mui/icons-material/Autorenew';

class CardItem extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return(
            <Box sx={{ minWidth:  900, padding: 2}}>
                <Card variant="outlined">
                    <CardContent>
                        <Typography variant="h5" component="div">
                            Algo Notes
                        </Typography>
                        <Typography variant="h6" color="text.secondary">
                            OCR
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Download Audio</Button>
                        <Button size="small">Download Source</Button>
                        <Typography color="text.secondary">
                            <LocalOfferIcon /> Algo
                        </Typography>
                    </CardActions>
                </Card>
            </Box>
        );
    }
}

export default CardItem;