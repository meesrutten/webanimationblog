import React from 'react';
import * as Icon from 'react-feather';
import {
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
} from 'react-share';

export const Share = props => {
  const { socialConfig, tags } = props;

  const hasSharePossibilities = () => {
    if (typeof window !== 'undefined') {
      // @ts-ignore
      return window.navigator && window.navigator.share;
    } else {
      return false;
    }
  };

  async function share() {
    // Must be triggered some kind of "user activation"
    if (typeof window !== 'undefined') {
      if (hasSharePossibilities()) {
        window.navigator['share']({
          title: 'webanimation.blog',
          text: 'Read about web animation by @meesrttn',
          url: `${window.location.href}`,
        })
          .then(() => {
            //	To do:
            //	Analytics with Share info
          })
          .catch(error => console.log('Error sharing', error));
      } else {
        await navigator.clipboard
          .writeText(window.location.href)
          .then(() => {
            alert('URL copied to clipboard');
          })
          .catch(err => {
            // This can happen if the user denies clipboard permissions:
            alert('Could not copy URL');
          });
      }
    }
  }

  return (
    <div className="post-social">
      <FacebookShareButton
        url={socialConfig.config.url}
        quote={`${socialConfig.config.title} - ${socialConfig.config.text}`}
        hashtag={tags ? `#${tags[0]}` : '#webdevelopment'}
        className="button mr-4"
      >
        <span className="icon">
          <Icon.Facebook className="stroke-1" />
        </span>
      </FacebookShareButton>
      <TwitterShareButton
        url={socialConfig.config.url}
        className="button mr-4"
        title={socialConfig.config.title}
        via={socialConfig.twitterHandle.split('@').join('')}
        hashtags={tags ? tags : ['webdev', 'webanimation', 'webdevelopment']}
      >
        <span className="icon">
          <Icon.Twitter className="stroke-1" />
        </span>
      </TwitterShareButton>
      <LinkedinShareButton
        url={socialConfig.config.url}
        className="button mr-4"
        title={socialConfig.config.title}
        summary={socialConfig.config.text}
      >
        <span className="icon">
          <Icon.Linkedin className="stroke-1" />
        </span>
      </LinkedinShareButton>
      <button
        className="button mr-4"
        type={'button'}
        aria-label={'share'}
        onClick={() => share()}
      >
        <Icon.Share className="stroke-1" />
      </button>
    </div>
  );
};
