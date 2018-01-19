import React, {Component} from 'react';
import MediaQuery from 'react-responsive';

import {MuiThemeProvider, createMuiTheme} from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import indigo from 'material-ui/colors/indigo';
import {Card, CardMedia, Paper} from "material-ui";
import Button from 'material-ui/Button';

import { theme } from '/client/ui/CustomTheme.js';
import HomeAppBar from '/client/ui/components/HomeAppBar.js';
import Text from '/client/ui/components/Text.js';
import {Facebook, Twitter, Instagram} from '/client/ui/buttons/SocialMedia.js';
import SubscriptionModal from '/client/ui/components/SubscriptionModal.js';
import FaqCard from '/client/ui/components/FaqCard.js';


const imageElevation = 7;

// Main application entry point
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subModalOpen: false
        };
    };

    handleOpen = () => {
        this.setState({
            subModalOpen: true
        });
    };

    handleClose = () => {
        this.setState({
            subModalOpen: false
        });
    };

    render() {
        return (
            <MuiThemeProvider theme={theme}>
                <div id="app">
                    <HomeAppBar/>

                    <div id="app-body">
                        {/* SubText */}
                        <SubTextBox />

                        {/* Title Row */}
                        <div id="title-row" className="split-column-row" style={{ gridArea: 'title-row', gridColumnGap: '20px', alignItems: 'center' }}>
                            <div style={{ gridArea: 'left' }}>
                                {/*  */}
                                <MediaQuery maxDeviceWidth={600}>
                                    { (matches) => {
                                        let id = "title-row-image";
                                        let titleRowImage = "/images/code-illustration.png";
                                        return (matches) ? <ImageCard id={id} image={titleRowImage} style={{ marginTop: '-20px'}} /> :
                                                           <img style={{ width: '100%' }} src="/images/code-illustration.png" />
                                    }}
                                </MediaQuery>
                            </div>

                            <div id="main-textbox">
                                <MediaQuery maxDeviceWidth={600}>
                                    { (matches) => {
                                        if (matches) return(
                                                <Card style={{ padding: '20px 15px 20px 15px', marginTop: '-20px'}}>
                                                    <TitleRowText align="center" />
                                                </Card>
                                        );
                                        else return <TitleRowText align="left" />;
                                    }}
                                </MediaQuery>

                                <br/>
                                <div className='social-media-buttons'>
                                    <div style={{gridArea: 'email', padding: '10px', width: 'auto', textAlign: 'center'}}>
                                        <Button style={{ background: theme.palette.primary[500], borderRadius: '25px' }}
                                                color="contrast" onClick={this.handleOpen}>Stay Posted</Button>

                                        <SubscriptionModal open={this.state.subModalOpen} onClose={this.handleClose} />
                                    </div>

                                    <div style={{gridArea: 'social', display: 'inline', width: 'auto', textAlign: 'center'}}>
                                        {Facebook()}
                                        {Twitter()}
                                        {Instagram()}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Info Row */}
                        <div className="split-column-row" style={{gridArea: 'info-row', gridColumnGap: '20px', alignItems: 'center'}}>
                            <div className="centered-mobile" style={{gridArea: 'left'}}>
                                <MediaQuery maxDeviceWidth={600}>
                                    { (matches) => (matches) ? <InfoRowText align="center" /> :
                                                               <InfoRowText style={{ paddingLeft: '10%', paddingRight: '10%' }} align="left" /> }
                                </MediaQuery>
                            </div>

                            <div style={{gridArea: 'right'}}>
                                <MediaQuery maxDeviceWidth={600}>
                                    { (matches) => (matches) ?
                                        <ImageCard id="info-row-image" image="/images/code.jpg"
                                            style={{ marginLeft: '-10px', marginRight: '-10px'}}
                                        /> :
                                        <img src="/images/code.jpg" style={{ width: '100%' }} />
                                    }
                                </MediaQuery>
                            </div>
                        </div>

                        {/* Quote Row */}
                        <div style={{gridArea: 'quote-row', justifySelf: 'center'}}>
                            <MediaQuery maxDeviceWidth={600}>
                                { (matches) => {
                                    if (matches) return(
                                        <Card style={{ padding: '20px 15px 20px 15px', marginTop: '-30px'}}>
                                            <QuoteRowText type="headline" />
                                        </Card>
                                    );
                                    else return <QuoteRowText type="display1" />;
                                }}
                            </MediaQuery>
                        </div>

                        {/* FAQ Row */}
                        <div style={{gridArea: 'faq-row', justifySelf: 'center'}}>
                            <Text color="primary" type="display2" align="center" text="Frequently Asked Questions" />
                            <br/>
                            <FAQ />
                        </div>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}

/*************** Stateless Components ***************/

/*
 * Text to be displayed in the title row.
 * Props:
 * - align - Alignment applied to the text.
 */
const TitleRowText = ({ align }) => (
    <Text color="primary" type="display2" align={align}
          text="Waterloo's biggest social innovation hackathon is coming back in May 2018."
    />
);

/*
 * Text to be displayed in the info row.
 * Props:
 * - align - Alignment applied to the text.
 */
const InfoRowText = ({ align, style }) => (
    <div style={style}>
        <Text color="primary" type="display2" align={align} text="What is Equithon?" />
        <Text color="secondary" type="body1" align={align}
              text="Equithon is a hackathon for students to create technical projects that solve an equity issue or promote equity. We strive to provide an inclusive environment at our event where hackers can get support from industry mentors to develop their ideas and projects."
        />
    </div>
);

/*
 * Text to be displayed in the quote row.
 */
const QuoteRowText = ({ type }) => (
    <div>
        <i><Text color="primary" type={type} align="left"
                 text="&quotEquity isn't a women's issue,<br/>Equity is an everyone issue.&quot"
        /></i>
        <br/>
        <Text color="primary" type="subheading" align="right" text="Feridun Hamdullahpur,<br/> President and Vice-Chancellor" />
    </div>
);

/*
 * Card containing an image.
 * Props:
 * - id    - Id for specific reference.
 * - image - Path to image that card will contain.
 * - style - Styling applied to card.
 */
const ImageCard = ({ id, image, style }) => (
    <Card elevation={ imageElevation } className="image-card" style={style}>
        <CardMedia id={id} image={image}/>
    </Card>
);

/*
 * Subtext box containing subtext information on when and where.
 */
const SubTextBox = () => (
    <MediaQuery maxDeviceWidth={600}>
        { (matches) => {
            let leftTitle  = 'WHEN';
            let leftBody   = 'May 2018';
            let rightTitle = 'WHERE';
            let rightBody  = 'University of Waterloo';
            if (matches) return (
                <div style={{ gridArea: 'subtext-row', zIndex: 50 }}>
                    <Card elevation={ 7 } raised={ true } style={{ width: '100%', marginBottom: '-30px' }}>
                        <div className="subtext-grid" style={{ width: '100%'}}>
                            <div style={{ gridArea: 'left', margin: '5px', marginLeft: '10px' }}>
                                <Text type="body1"                   text={leftTitle} />
                                <Text type="body2" color="secondary" text={leftBody} />
                            </div>
                            <div style={{ gridArea: 'right', margin: '5px', marginRight: '10px', marginLeft: '-10px' }}>
                                <Text type="body1" align="left"                   text={rightTitle} />
                                <Text type="body2" color="secondary" align="left" text={rightBody} />
                            </div>
                        </div>
                    </Card>
                </div>);
            else return (
                <div style={{ gridArea: 'subtext-row' }}>
                    <div className="split-column-row">
                        <div className="subtext-grid" style={{ gridArea: 'right', backgroundColor: theme.palette.primary[500] }}>
                            <div style={{gridArea: 'left', padding: '5px', paddingLeft: '35%', backgroundColor: 'white' }}>
                                <Text type="body1" align="left"                   text={leftTitle} />
                                <Text type="body2" color="secondary" align="left" text={leftBody} />
                            </div>

                            <div style={{gridArea: 'right', padding: '5px', paddingLeft: '25%', backgroundColor: 'white'}}>
                              <Text type="body1" align="left"                   text={rightTitle} />
                              <Text type="body2" color="secondary" align="left" text={rightBody} />
                            </div>
                        </div>
                    </div>
                </div>
            );
        }}
  </MediaQuery>
);

/*
 * FAQs to be displayed as a series of collapsable cards.
 */
const FAQ = () => (
    <div>
        <FaqCard
            question="What is a hackathon?"
            answer="A hackathon is an event where the participants, either individually or in teams, build projects from scratch over a short period of time (in this case, three days) and present to a team of judges. Hackathons are a place to be creative, learn new skills, and make new friends!"
            number="1."
        />
        <br/>
        <FaqCard
            question="Can I attend if I have never coded and/or been to a hackathon before?"
            answer="Definitely! Equithon is open to all students who are interested in supporting equity. Experience in coding is an asset, but is not required. There will be many workshops tailored to a range of skill levels to help you with your hack."
            number="2."
        />
        <br/>
        <FaqCard
            question="What can I make?"
            answer="You can make anything that raises awareness of or addresses an issue related to equity - whether it be gender, racial, etc. We will be providing resources leading up to and during Equithon to help you brainstorm."
            number="3."
        />
        <br/>
        <FaqCard
            question="Can I work on a project at Equithon that I’ve already started?"
            answer="No. To ensure fairness, hackers must submit projects started at Equithon."
            number="4."
        />
        <br/>
        <FaqCard
            question="Why is Equithon not an overnight event?"
            answer="We decided that Equithon should not be an overnight event because we want to be as inclusive as possible. Hackathons that span a whole weekend can be intimidating - we want people who would not normally be comfortable attending hackathons to join us too."
            number="5."
        />
        <br/>
        <FaqCard
            question="When are applications open?"
            answer="Applications for hackers will open in Winter 2018."
            number="6."
        />
        <br/>
        <FaqCard
            question="Have more questions?"
            number="7."
            answer='Send us an email at <a href="mailto:hello@equithon.org">hello@equithon.org</a>.' // Iffy syntax but necessary to make link
        />
    </div>
);
