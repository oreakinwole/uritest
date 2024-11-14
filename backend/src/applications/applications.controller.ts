import { Controller, Get } from '@nestjs/common';

interface Application {
  id: string;
  jobTitle: string;
  companyName: string;
  status: string;
  dateApplied: string;
}

interface Stats {
  totalApplicants: number;
  countByStatus: {
    statusName: 'pending' | 'accepted' | 'rejected';
    count: number;
  }[];
}

@Controller('applications')
export class ApplicationsController {
  @Get()
  findAll(): Application[] {
    return [
      {
        id: '01',
        jobTitle: 'DevOps Engineer',
        companyName: 'FusionTech',
        status: 'accepted',
        dateApplied: '2024-08-25',
      },
      {
        id: '02',
        jobTitle: 'Backend Developer',
        companyName: 'FusionTech',
        status: 'rejected',
        dateApplied: '2024-07-18',
      },
      {
        id: '03',
        jobTitle: 'Project Manager',
        companyName: 'MindForge',
        status: 'rejected',
        dateApplied: '2024-06-04',
      },
      {
        id: '04',
        jobTitle: 'Systems Analyst',
        companyName: 'DesignHut',
        status: 'accepted',
        dateApplied: '2024-05-22',
      },
      {
        id: '05',
        jobTitle: 'Software Engineer',
        companyName: 'UrbanCoders',
        status: 'accepted',
        dateApplied: '2024-09-04',
      },
      {
        id: '06',
        jobTitle: 'Data Scientist',
        companyName: 'UrbanCoders',
        status: 'rejected',
        dateApplied: '2024-06-03',
      },
      {
        id: '07',
        jobTitle: 'Full Stack Developer',
        companyName: 'UrbanCoders',
        status: 'pending',
        dateApplied: '2024-05-05',
      },
      {
        id: '08',
        jobTitle: 'Mobile Developer',
        companyName: 'UrbanCoders',
        status: 'rejected',
        dateApplied: '2024-07-26',
      },
      {
        id: '09',
        jobTitle: 'Software Engineer',
        companyName: 'ByteWorks',
        status: 'rejected',
        dateApplied: '2024-07-12',
      },
      {
        id: '10',
        jobTitle: 'Project Manager',
        companyName: 'MindForge',
        status: 'accepted',
        dateApplied: '2024-08-29',
      },
      {
        id: '11',
        jobTitle: 'Data Scientist',
        companyName: 'Skyline Solutions',
        status: 'accepted',
        dateApplied: '2024-03-22',
      },
      {
        id: '12',
        jobTitle: 'QA Engineer',
        companyName: 'NextGen',
        status: 'accepted',
        dateApplied: '2024-01-03',
      },
    ];
  }

  @Get('/stats')
  getStats(): Stats {
    return {
      totalApplicants: 12,
      countByStatus: [
        {
          statusName: 'pending',
          count: 1,
        },
        {
          statusName: 'accepted',
          count: 6,
        },
        {
          statusName: 'rejected',
          count: 5,
        },
      ],
    };
  }
}
