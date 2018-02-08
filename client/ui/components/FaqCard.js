import React, { Component } from 'react';

import { withStyles } from 'material-ui/styles';
import classnames from 'classnames';
import Card, { CardHeader, CardContent } from 'material-ui/Card';
import Collapse from 'material-ui/transitions/Collapse';
import IconButton from 'material-ui/IconButton';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import Avatar from 'material-ui/Avatar';

import Text from '/client/ui/components/Text.js';


/*
 * Borrowed from https://material-ui-next.com/demos/cards/.
 */
const styles = theme => ({
  root: {
    background: '#F5F5F5',
  },

  avatar: {
    margin: '10',
    color: '#9E9E9E',
    opacity: '0%',
    backgroundColor: '#FFFFFF',
  },
  avatarBackground: {
    backgroundColor: '#F5F5F5',
  },

  expand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
});

/*
 * Props:
 * - question: Question to be placed as title of the card.
 * - answer: Answer to be placed as body of the card.
 * - number: Question number to be placed to the left of the question.
 */
class FaqCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      backgroundSelected: false,
    };

    this.handleExpandedClick = this.handleExpandedClick.bind(this);
  }

  handleExpandedClick = () => {
    this.setState({
      expanded: !this.state.expanded,
      backgroundSelected: !this.state.backgroundSelected,
    });
  };

  render() {
    const { classes } = this.props;

    return(
      <div>
        <Card className="faq-card">
          <CardHeader
            className={classnames({
              [classes.root]: this.state.backgroundSelected // Color header background grey when selected
            })}

            title={ <Text color="default" type="headline" text={this.props.question} /> }

            avatar={
              <Avatar
                className={classnames(classes.avatar, {
                  [classes.avatarBackground]: this.state.backgroundSelected // Enable grey background along with header
                })}
                aria-label="FAQ"
              >
                {this.props.number}
              </Avatar>
            }

            action={
              <IconButton
                className={classnames(classes.expand, {
                  [classes.expandOpen]: this.state.expanded,
                })}
                onClick={this.handleExpandedClick}
                aria-expanded={this.state.expanded}
                aria-label="Show More"
              >
                <ExpandMoreIcon />
              </IconButton>
            }
          />

          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Text color="secondary" type="body2" text={this.props.answer} />
            </CardContent>
          </Collapse>
        </Card>
      </div>
    );
  }
}

export default withStyles(styles)(FaqCard);
