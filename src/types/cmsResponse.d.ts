interface File {
  data: {
    id: string;
    attributes: {
      name: string;
      alternativeText: string;
      caption: string;
      ext: string;
      size: number;
      url: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface TermsOfServiceCMSResponse {
  data: {
    id: string;
    attributes: {
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface PrivacyPolicyCMSResponse {
  data: {
    id: string;
    attributes: {
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}

interface AboutCMSResponse {
  data: {
    id: string;
    attributes: {
      title: string;
      content: string;
      createdAt: string;
      updatedAt: string;
    };
  };
}
