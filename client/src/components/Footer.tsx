import React from 'react';
import packageJson from '../../package.json';

const Footer = () => (
  <div className="uocg-footer">
    <div className="columns">
      <div className="column">
        <div className="version">
          <div>
            v{packageJson.version}<br/>
            <a href="https://github.com/itsmatttobin/uocg" target="_blank">itsmatttobin/uocg</a><br/>
            Found a bug? Report it <a href="https://github.com/itsmatttobin/uocg/issues" target="_blank">here</a>.
          </div>
        </div>
      </div>
      <div className="column">
        <div className="content has-text-right">
          <p>
            UOCG is not affiliated with <a className="has-text-info" href="https://cardsagainsthumanity.com/" target="_blank">
              Cards Against Humanity.</a><br/>
            Cards Against Humanity is made available under a Creative Commons BY-NC-SA 2.0 license.<br/>
            "Cards Against Humanity" and the CAH logos are trademarks of Cards Against Humanity LLC.
          </p>
        </div>
      </div>
    </div>
  </div>
);

export default Footer;
