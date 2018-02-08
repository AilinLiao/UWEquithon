import React, { Component } from 'react';
import { Session } from 'meteor/session';
import { Tracker } from 'meteor/tracker';

import MediaQuery from 'react-responsive';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';

import {MuiThemeProvider} from 'material-ui/styles';
import {Card, CardContent, CardMedia} from "material-ui";

import HomeAppBar from '/client/ui/components/HomeAppBar.js';
import { theme } from '/client/ui/CustomTheme.js';
import Text from '/client/ui/components/Text.js';
import {Facebook, Twitter, Instagram} from '/client/ui/buttons/SocialMedia.js';
import SubscriptionModal from '/client/ui/components/SubscriptionModal.js';
import UnsubscribeModal from '/client/ui/components/UnsubscribeModal.js';
import Login from '/client/ui/components/Login.js';
import Signup from '/client/ui/components/Signup.js';
import Apply from '/client/ui/components/Apply.js';
import FaqCard from '/client/ui/components/FaqCard.js';
import FlatColoredButton from '/client/ui/buttons/FlatColoredButton.js';
import Home from '/client/ui/Home.js';
import Accounts from '/client/ui/components/Accounts.js';


const imageElevation = 7;

// Main application entry point
export default class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            subModalOpen: false,
            unsubModalOpen: false,

            userId: '',
        };

        this.userIdComputation = undefined;
    };

    componentDidMount() {
        this.userIdComputation = Tracker.autorun(() => {
            Meteor.subscribe('userData');
            let userId = Meteor.userId();
            if (userId) this.setState({
                userId: userId,
            });
            else this.setState({
                userId: '',
            });
        });
    }

    componentWillUnmount() {
        this.userIdComputation.stop();
    }

    handleSubModalOpen = () => {
        this.setState({
            subModalOpen: true,
            unsubModalOpen: false,
        });
    };

    handleUnsubModalOpen = () => {
        this.setState({
            subModalOpen: false,
            unsubModalOpen: true,
        });
    };

    handleClose = () => {
        this.setState({
            subModalOpen: false,
            unsubModalOpen: false,
        });
    };

    renderAppBody() {
        return(
            <div id="app">
                <HomeAppBar />
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
                                    return (matches) ? <ImageCard id={id} image="/images/code-illustration.png" style={{ marginTop: '-20px'}} /> :
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
                                    <FlatColoredButton onClick={this.handleSubModalOpen} content="Stay Posted" />
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
                                    <InfoRowText style={{ paddingLeft: '10%', paddingRight: '10%' }} align="left" />
                                }
                            </MediaQuery>
                        </div>

                        <div style={{gridArea: 'right'}}>
                            <MediaQuery maxDeviceWidth={600}>
                                { (matches) => (matches) ?
                                    <ImageCard id="info-row-image" image="/images/group-computing-small.png"
                                        style={{ marginLeft: '-10px', marginRight: '-10px'}}
                                    /> :
                                    <img src="/images/group-computing-small.png" style={{ width: '100%' }} />
                                }
                            </MediaQuery>
                        </div>
                    </div>

                    {/* Quote Row */}
                    <div style={{gridArea: 'quote-row', justifySelf: 'center'}}>
                        <MediaQuery maxDeviceWidth={600}>
                            { (matches) => {
                                if (matches) return(
                                    <Card style={{ marginTop: '-30px' }}>
                                        <CardContent>
                                            <QuoteRowText />
                                        </CardContent>
                                    </Card>
                                );
                                else return(
                                    <Card className="split-column-row">
                                        <CardContent style={{ gridArea: 'left' }}>
                                            <QuoteRowText />
                                        </CardContent>
                                        <CardMedia style={{ gridArea: 'right' }} image="/images/feridun_crop.jpg" title="Feridun Hamdullahpur" />
                                    </Card>
                                );
                            }}
                        </MediaQuery>
                    </div>

                    {/* FAQ Row */}
                    <div style={{gridArea: 'faq-row', justifySelf: 'center'}}>
                        <Text color="primary" type="display2" align="center" text="Frequently Asked Questions" />
                        <br/>
                        <FAQ />
                    </div>

                    {/* Footer */}
                    <div className="footer split-column-row">
                        <div style={{ textAlign: 'center' }}>
                            <img src="/logos/logo_200x153.png" style={{ width: '100px' }} />
                        </div>
                        <div style={{ margin: 'auto', textAlign: 'center' }}>
                            <Text color="secondary" type="body2" text={ <p>Contact us: <a href="mailto:hello@equithon.org">hello@equithon.org</a> </p> } />
                            <Text color="secondary" type="body2" text="University of Waterloo" />
                            <Text color="secondary" type="body2"
                                text={ <a href="#" onClick={this.handleUnsubModalOpen}><u>Unsubscribe</u></a> }
                            />
                            <UnsubscribeModal open={this.state.unsubModalOpen} onClose={this.handleClose} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    render() {
        return (
            <MuiThemeProvider theme={theme}>
              <Router>
                  <div style={{ width: 'inherit', height: 'inherit' }}>
                      {/* Home page */}
                      <Route exact path="/" render={ () => this.renderAppBody() } />

                      {/* Route to application */}
                      <Route path="/apply" component={Apply} />

                      {/* Render accounts */}
                      <Route path="/accounts" component={Accounts} />
                  </div>
              </Router>
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
          text="Applications for Equithon 2018 are open now!"
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
const QuoteRowText = () => (
    <div>
        <Text color="primary" type="headline" align="left"
            text={ <i><div>"Equity isn't a women's issue,<br/>Equity is an everyone issue."</div></i> }
        />
        <br/>
        <Text color="primary" type="subheading" align="right"
            text={ <div>Feridun Hamdullahpur<br/>President and Vice-Chancellor,<br/>University of Waterloo</div> }
        />
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
            let leftBody   = 'May 4-6, 2018';
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
            answer="You can make anything that raises awareness of or addresses an issue related to equity in one of five categories. The categories for Equithon 2018 are: Access to Education, LGBTQ+ Rights, Mental Health, Physical Disabilities, and Women Empowerment. We will be providing resources leading up to and during Equithon to help you develop your ideas into a great hack."
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
            answer="Applications for hackers are open now!"
            number="6."
        />
        <br/>
        <FaqCard
            question="How can I help with the event?"
            answer={ <p>Registration for volunteers will open closer to the event, so sign up for our mailing list using the Stay Posted button above and follow us on social media to be notified when it opens! If you are interested in being a mentor, please send us an email at <a href="mailto:hello@equithon.org">hello@equithon.org</a>.</p>}
            number="7."
        />
        <br/>
        <FaqCard
            question="Have more questions?"
            number="8."
            answer={ <p>Send us an email at <a href="mailto:hello@equithon.org">hello@equithon.org</a>.</p> }
        />
    </div>
);
