export type Job = {
  title: any;
  id: string;
  type: string;
  attributes: {
    title: string;
  };
  relationships: {
    skills: Skill[];
  };
};

export type Skill = {
  id: string;
};