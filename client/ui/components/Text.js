import React, {Component} from 'react';
import MediaQuery from 'react-responsive';

import Typography from 'material-ui/Typography';
import { withTheme } from 'material-ui/styles';


/* Styles given text with Material-UI Typography
 * using the correct scaled font-size.
 *
 * Note: Should probably support arbitrary styling passed
 *       to the Typography component.
 *
 * Props:
 * - color
 * - type
 * - align
 * - text
 * - style
 * - className
 */
class Text extends Component {
  constructor(props) {
    super(props);
  };

  modifyStyling(type) {
    switch (type) {
      //case 'display4':
      case 'display3':
        return { fontSize: '11vw' };
      case 'display2':
        return { fontSize: '10vw' };
      case 'display1':
        return { fontSize: '8vw' };
      case 'headline':
        return { fontSize: '6vw' };
      case 'title':
        return { fontSize: '5vw' };
      case 'subheading':
        return { fontSize: '4vw' };
      case 'body2':
      case 'body1':
      case 'caption':
      case 'button':
      default:
        return {};
    }
  }

  render() {
    var smallStyle = {
      fontSize: '150%'
    };

    return(
        <MediaQuery maxWidth='600px'>
          { (matches) => {
            if (matches) {
              return(
                <Typography
                  className={this.props.className}
                  style={Object.assign(this.modifyStyling(this.props.type), this.props.style)}
                  color={this.props.color}
                  type={this.props.type}
                  align={this.props.align}
                >
                  {this.props.text}
                </Typography>
              );
            } else {
              return(
                <Typography
                  className={this.props.className}
                  style={this.props.style}
                  color={this.props.color}
                  type={this.props.type}
                  align={this.props.align}
                >
                  {this.props.text}
                </Typography>
              );
            }
          }}
        </MediaQuery>
    );
  }
}

export default withTheme()(Text);
