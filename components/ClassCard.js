import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { CHIRP_API_KEY } from "../lib/chirp_config";

const styles = {
    card: {
        minWidth: 320,
        maxWidth: 600,
        border: 'solid 1px dodgerblue'
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginTop: 12,
        marginBottom: 6,
        color: "darkred",
        fontSize: '1.1em'
    }
};

class ClassCard extends React.Component {
    constructor() {
        super();
        this.sdk = '';
    }

    async componentDidMount(){
        const chirp = await import('../node_modules/chirpsdk/index');
        const { Chirp } = chirp;
        this.sdk = Chirp;
    }

    render() {
        const { classes } = this.props;
        return (
          <Card className={classes.card}>
            <CardContent>
              <Typography className={classes.title} gutterBottom>
                <span
                  style={{fontSize: "1.1em", marginRight:'0.4em'}}
                >
                  EVENTCODE -- 
                </span>
                <span style={{ color: "dodgerblue", fontSize:'1.5em'}}>
                  {this.props.eventCode.substr(0, 6)}
                </span>
              </Typography>
              <Typography variant="h4" component="h4">
                <em>{this.props.eventName}</em>
              </Typography>
              <Typography className={classes.pos}>
                <span style={{ color: "darkblue" }}>START @</span>{" "}
                {`${this.props.eventStart
                  .toLocaleString()
                  .substr(0, 17)}`}
              </Typography>
              <Typography className={classes.pos}>
                <span style={{ color: "darkblue" }}>END @</span>{" "}
                {`${this.props.eventEnd
                  .toLocaleString()
                  .substr(0, 17)}`}
              </Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                variant="outlined"
                onClick={e => {
                  this.sdk({ key: `${CHIRP_API_KEY}` })
                    .then(sdk => {
                      sdk.send(this.props.eventCode.substr(6));
                    })
                    .catch(console.error);
                }}
              >
                Take attendance
              </Button>
            </CardActions>
          </Card>
        );
    }
}

ClassCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ClassCard);