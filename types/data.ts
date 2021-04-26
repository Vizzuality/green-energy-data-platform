export type SubgroupProps = {
  id: number;
  slug: string;
  name: string;
  group: number;
};

export interface GroupProps {
  id: number;
  slug: string;
  title: string;
  subtitle: string;
  status: string;
  description: string;
  subgroups: SubgroupProps[];
}
