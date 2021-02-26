import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './location.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ILocationDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const LocationDetail = (props: ILocationDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { locationEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="locationDetailsHeading">
          <Translate contentKey="jhipTest2App.location.detail.title">Location</Translate> [<strong>{locationEntity.id}</strong>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="streetAddress">
              <Translate contentKey="jhipTest2App.location.streetAddress">Street Address</Translate>
            </span>
          </dt>
          <dd>{locationEntity.streetAddress}</dd>
          <dt>
            <span id="postalCode">
              <Translate contentKey="jhipTest2App.location.postalCode">Postal Code</Translate>
            </span>
          </dt>
          <dd>{locationEntity.postalCode}</dd>
          <dt>
            <span id="city">
              <Translate contentKey="jhipTest2App.location.city">City</Translate>
            </span>
          </dt>
          <dd>{locationEntity.city}</dd>
          <dt>
            <span id="stateProvince">
              <Translate contentKey="jhipTest2App.location.stateProvince">State Province</Translate>
            </span>
          </dt>
          <dd>{locationEntity.stateProvince}</dd>
          <dt>
            <Translate contentKey="jhipTest2App.location.country">Country</Translate>
          </dt>
          <dd>{locationEntity.country ? locationEntity.country.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/location" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/location/${locationEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ location }: IRootState) => ({
  locationEntity: location.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(LocationDetail);
