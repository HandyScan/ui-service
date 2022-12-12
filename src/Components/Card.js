import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocalOfferIcon from '@mui/icons-material/LocalOffer';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import { Link } from '@mui/material';
import DownloadForOfflineOutlinedIcon from '@mui/icons-material/DownloadForOfflineOutlined';

class CardItem extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let card;
        return(
            <Box sx={{ minWidth: this.props.width, padding: 2}}>
                {
                    this.props.behaviour === "tag" ?
                        this.props.collections.map((item, index) => (
                            <Card variant="outlined" key={index}>
                                <CardContent>
                                    <Typography variant="h5" component="div">
                                        <LocalOfferIcon />
                                        {item}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))
                        :
                        this.props.collections.map((item, index) => (
                            <Card variant="outlined" key={index}>
                                <CardContent>
                                <Typography variant="h5" component="div">
                                    {item["fileName"]}
                                </Typography>
                                <Typography variant="h6" color="text.secondary" sx={{marginRight: 40}}>
                                    <AutorenewIcon />
                                    {item["status"]}
                                </Typography>
                                {item['status'] === "DONE" ?
                                        <Link href={item['download']} target={"balnk"}>
                                            <DownloadForOfflineOutlinedIcon />
                                            {/* Download */}
                                        </Link>
                                        :
                                        undefined
                                }
                                
                        </CardContent>
                        <CardActions>
                            
                        </CardActions>
                        </Card>
                        ))
                    }
            </Box>
        );
    }
}

export default CardItem;