import { Badge } from '@/components/ui/badge';
import { Card, CardBody } from '@/components/ui/card';
import { Schools } from '@/types/definitions';

export const SelectSchool = ({
  schools,
  getSchoolDetails,
}: {
  schools: Schools[] | undefined;
  getSchoolDetails: (id: string) => void;
}) => {
  return (
    <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
      {schools?.map((school) => (
        <Card
          key={school.id}
          id={school.id}
          className="transition-all hover:-translate-y-0.5 hover:shadow-card-hover"
          onClick={getSchoolDetails}
        >
          <CardBody className="flex flex-col gap-3 cursor-pointer">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <h3 style={{ color: 'var(--t1)' }} className="truncate text-[15px] font-semibold">
                  {school.schoolName}
                </h3>
                <p style={{ color: 'var(--t3)' }} className="mt-1 text-sm">
                  {school.address}
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Badge
                color={
                  school.type === 'SECONDARY'
                    ? 'orange'
                    : school.type === 'TERTIARY'
                      ? 'blue'
                      : 'pink'
                }
              >
                {school.type}
              </Badge>
              <Badge color={school.status === 'ACTIVE' ? 'green' : 'gray'}>{school.status}</Badge>
              <Badge color="purple">{school.setup}</Badge>
            </div>

            <div className="space-y-2 text-sm">
              <div className="grid gap-4 grid-cols-2">
                <span style={{ color: 'var(--t3)' }}>Email</span>
                <span style={{ color: 'var(--t2)' }} className="truncate text-right">
                  {school.email}
                </span>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <span style={{ color: 'var(--t3)' }}>Phone</span>
                <span style={{ color: 'var(--t2)' }} className="truncate text-right">
                  {school.phoneNumber}
                </span>
              </div>
              <div className="grid gap-4 grid-cols-2">
                <span style={{ color: 'var(--t3)' }}>Location</span>
                <span style={{ color: 'var(--t2)' }} className="truncate text-right">
                  {school.state}, {school.country}
                </span>
              </div>
            </div>
          </CardBody>
        </Card>
      ))}
    </div>
  );
};
