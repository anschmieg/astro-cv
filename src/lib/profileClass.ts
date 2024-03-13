import { profile as profileData } from "../content/cv/profile";

export default class Profile {
  profile: typeof profileData;

  constructor(initialProfileData: typeof profileData) {
    this.profile = { ...initialProfileData };
  }

  getData() {
    return this.profile;
  }

  getValue(key: string) {
    return this.profile[key];
  }

  hasKey(key: string) {
    return this.profile.hasOwnProperty(key);
  }

  popValue(key: string) {
    var value = this.profile[key];
    delete this.profile[key];
    return value;
  }

  createEntry(key: string) {
    let content: string = this.profile[key] ? this.profile[key] : "";
    let linkTarget: string = "";
    let linkText: string = content;

    switch (key) {
      case "email":
        linkTarget = "mailto:" + content;
        linkText = content;
        break;
      case "phone":
        // remove dashes, spaces, / and + from phone number
        var phone = content.replace(/[-\s\/+]/g, "");
        linkTarget = "tel:" + phone;
        // add a plus before the country code, then add spaces every 3 digits
        linkText = phone.replace(
          /(\d{1,3})(\d{3})(\d{3})(\d{3})/,
          "+$1 $2 $3 $4"
        );
        break;
      case "website":
        var url = content;
        // if the url doesn't start with http or https, add http
        if (!url.match(/^(http|https):\/\//)) {
          url = "https://" + url;
        }
        linkTarget = url;
        // strip protocol and www from the link text
        linkText = url.replace(/(http|https):\/\/(www\.)?/, "");
        break;
      case "linkedin":
        // extract the username from the text provided
        var username = content.split("/").pop();
        // if the text isn't a full URL, add the LinkedIn domain
        if (!content.match(/^(http|https):\/\//)) {
          content = "https://www.linkedin.com/in/" + username;
        }
        linkTarget = content;
        linkText = username ? username : "not provided";
        break;
      case "github":
        // extract the username from the text provided
        var username = content.split("/").pop();
        // if the text isn't a full URL, add the GitHub domain
        if (!content.match(/^(http|https):\/\//)) {
          content = "https://github.com/" + username;
        }
        linkTarget = content;
        linkText = username ? username : "not provided";
        break;
      default:
        linkTarget = "";
        linkText = content;
        break;
    }

    return {
      linkTarget,
      linkText,
    };
  }
}
