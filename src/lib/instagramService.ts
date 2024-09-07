import axios from 'axios';

class InstagramService {
  private accessToken: string;
  private instagramAccountId: string;

  constructor(accessToken: string, instagramAccountId: string) {
    this.accessToken = accessToken;
    this.instagramAccountId = instagramAccountId;
  }

  async createMediaContainer(imageUrl: string, caption: string) {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v18.0/${this.instagramAccountId}/media`,
        {
          image_url: imageUrl,
          caption: caption,
          access_token: this.accessToken,
        }
      );
      console.log('Media container response:', response.data);
      return response.data.id;
    } catch (error) {
      console.error('Error creating media container:', error.response?.data || error.message);
      throw error;
    }
  }

  async publishMedia(containerId: string) {
    try {
      const response = await axios.post(
        `https://graph.facebook.com/v18.0/${this.instagramAccountId}/media_publish`,
        {
          creation_id: containerId,
          access_token: this.accessToken,
        }
      );
      console.log('Publish media response:', response.data);
      return response.data.id;
    } catch (error) {
      console.error('Error publishing media:', error.response?.data || error.message);
      throw error;
    }
  }

  async postSingleImage(imageUrl: string, caption: string) {
    const containerId = await this.createMediaContainer(imageUrl, caption);
    return this.publishMedia(containerId);
  }
}

const INSTAGRAM_ACCESS_TOKEN = process.env.INSTAGRAM_ACCESS_TOKEN || '';
const INSTAGRAM_ACCOUNT_ID = process.env.INSTAGRAM_ACCOUNT_ID || '';

const instagramService = new InstagramService(INSTAGRAM_ACCESS_TOKEN, INSTAGRAM_ACCOUNT_ID);
export default instagramService;
