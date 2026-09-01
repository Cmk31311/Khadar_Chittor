import * as THREE from "three";
import { WorkTimelinePoint } from "../types";

export const WORK_TIMELINE: WorkTimelinePoint[] = [
  {
    point: new THREE.Vector3(0, 0, 0),
    year: 'Oct 2022 - Dec 2024',
    title: 'HCLTech',
    subtitle: 'Software Engineer\nDeveloped core modules and streamlined workflows\nfor one of Australia\'s largest banks.',
    position: 'right',
  },
  {
    point: new THREE.Vector3(-4, -4, -3),
    year: 'Jan 2024 - May 2026',
    title: '\nMasters in Computer Science',
    subtitle: '\n\n\n\nCal State Fullerton',
    position: 'left',
  },
  {
    point: new THREE.Vector3(-3, -1, -6),
    year: 'June 2024 - Aug 2025',
    title: '\nGraduate Student Associate Developer',
    subtitle: '\n\n\n\nI write code the way I make coffee - strong,\nslightly chaotic, but it gets the job done.\nI thrive on turning ideas into interactive,\nscalable solutions.',
    position: 'right',
  },
  {
    point: new THREE.Vector3(0, -1, -10),
    year: 'Aug 2025 - May 2026',
    title: '\nGraduate Student Lead Developer',
    subtitle: '\n\n\nASC-CSUF\nAnalyzing massive support data, mentoring student assistants,\nand piloting AI solutions.',
    position: 'right',
  }
]
