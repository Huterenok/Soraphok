import { LinkI } from "shared/config/type";

export enum LectureElement {
  PAGE = "PAGE",
  FOLDER = "FOLDER",
}

export interface LectureI {
	id:string,
  type: LectureElement;
  trigger: LinkI | string;
  nestedPages?: LectureI[];
}

export const mockLecture: LectureI[] = [
  {
		id:"sasaxsacs3232",
    type: LectureElement.PAGE,
    trigger: {
      to: "/getting-started",
      title: "Getting started",
    },
  },
	{
		id:"sdxxcdl,sl",
    type: LectureElement.FOLDER,
    trigger: "Understanding",
    nestedPages: [
      {
				id:"ccs,sl",
        type: LectureElement.PAGE,
        trigger: {
          to: "/understanding/architecture",
          title: "About architecture",
        },
      },
      {
				id:"sdxxcdl,dskm",
        type: LectureElement.PAGE,
        trigger: {
          to: "/understanding/needs-driven",
          title: "Needs driven",
        },
      },
      {
				id:"f,l;r;,sl",
        type: LectureElement.PAGE,
        trigger: {
          to: "/understanding/knowledge-types",
          title: "Knowledge types",
        },
      },
      {
				id:"sdxxcvdvdl'[[dl,sl",
        type: LectureElement.FOLDER,
        trigger: "Promote1",
        nestedPages: [
          {
						id:"sdfewlkl;wef",
            type: LectureElement.PAGE,
            trigger: {
              to: "/promote/aspects",
              title: "Integration aspects",
            },
          },
          {
						id:"vd;wef",
            type: LectureElement.PAGE,
            trigger: {
              to: "/promote/application",
              title: "Partial Application",
            },
          },
          {
						id:"dvl,vd;wef",
            type: LectureElement.PAGE,
            trigger: {
              to: "/promote/team",
              title: "Promote in team",
            },
          },
        ],
      },
    ],
  },

  {
		id:"vfddf;wef",
    type: LectureElement.FOLDER,
    trigger: "Promote2",
    nestedPages: [
      {
				id:"l;v;;wef",
        type: LectureElement.PAGE,
        trigger: {
          to: "/promote/aspects",
          title: "Integration aspects",
        },
      },
      {
				id:"lfvpd;wef",
        type: LectureElement.PAGE,
        trigger: {
          to: "/promote/application",
          title: "Partial Application",
        },
      },
      {
				id:"lf,dl,vf;wef",
        type: LectureElement.PAGE,
        trigger: {
          to: "/promote/team",
          title: "Promote in team",
        },
      },
    ],
  },
];
