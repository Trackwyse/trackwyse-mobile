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
    data: {
      id: string;
      attributes: {
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}

interface PrivacyPolicyCMSResponse {
  data: {
    data: {
      id: string;
      attributes: {
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}

interface AboutCMSResponse {
  data: {
    data: {
      id: string;
      attributes: {
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
}

interface HelpCMSResponse {
  data: {
    data: {
      id: string;
      attributes: {
        title: string;
        content: string;
        createdAt: string;
        updatedAt: string;
      };
    }[];
  };
}
