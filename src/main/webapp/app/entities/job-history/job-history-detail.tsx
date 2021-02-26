import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './job-history.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IJobHistoryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const JobHistoryDetail = (props: IJobHistoryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { jobHistoryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="jobHistoryDetailsHeading">
          <Translate contentKey="jhipTest2App.jobHistory.detail.title">JobHistory</Translate> [<strong>{jobHistoryEntity.id}</strong>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="startDate">
              <Translate contentKey="jhipTest2App.jobHistory.startDate">Start Date</Translate>
            </span>
          </dt>
          <dd>
            {jobHistoryEntity.startDate ? <TextFormat value={jobHistoryEntity.startDate} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="endDate">
              <Translate contentKey="jhipTest2App.jobHistory.endDate">End Date</Translate>
            </span>
          </dt>
          <dd>{jobHistoryEntity.endDate ? <TextFormat value={jobHistoryEntity.endDate} type="date" format={APP_DATE_FORMAT} /> : null}</dd>
          <dt>
            <span id="language">
              <Translate contentKey="jhipTest2App.jobHistory.language">Language</Translate>
            </span>
          </dt>
          <dd>{jobHistoryEntity.language}</dd>
          <dt>
            <Translate contentKey="jhipTest2App.jobHistory.job">Job</Translate>
          </dt>
          <dd>{jobHistoryEntity.job ? jobHistoryEntity.job.id : ''}</dd>
          <dt>
            <Translate contentKey="jhipTest2App.jobHistory.department">Department</Translate>
          </dt>
          <dd>{jobHistoryEntity.department ? jobHistoryEntity.department.id : ''}</dd>
          <dt>
            <Translate contentKey="jhipTest2App.jobHistory.employee">Employee</Translate>
          </dt>
          <dd>{jobHistoryEntity.employee ? jobHistoryEntity.employee.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/job-history" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/job-history/${jobHistoryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ jobHistory }: IRootState) => ({
  jobHistoryEntity: jobHistory.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(JobHistoryDetail);
