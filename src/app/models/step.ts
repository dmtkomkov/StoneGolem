export interface Step {
  id: number,
  duration: number,
  completedOn: Date,
  description: string,
  userId: string,
  user: {
    userId: string,
    userName: string
  },
  category: {
    id: number,
    name: string,
    color: string,
    description: string,
    areaId: number,
    area: {
      id: number,
      name: string,
      color: string,
      description: string,
    },
  }
  goal?: {
    id: number,
    name: string,
    color: string,
    description: string,
    projectId?: number,
    project: {
      id: number,
      name: string,
      color: string,
      description: string,
      status: string,
      startDate: string,
      closeDate: string,
    },
  }
}
