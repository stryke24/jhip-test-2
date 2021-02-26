import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './country.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICountryDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const CountryDetail = (props: ICountryDetailProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const { countryEntity } = props;
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="countryDetailsHeading">
          <Translate contentKey="jhipTest2App.country.detail.title">Country</Translate> [<strong>{countryEntity.id}</strong>]
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="countryName">
              <Translate contentKey="jhipTest2App.country.countryName">Country Name</Translate>
            </span>
          </dt>
          <dd>{countryEntity.countryName}</dd>
          <dt>
            <Translate contentKey="jhipTest2App.country.region">Region</Translate>
          </dt>
          <dd>{countryEntity.region ? countryEntity.region.id : ''}</dd>
        </dl>
        <Button tag={Link} to="/country" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/country/${countryEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

const mapStateToProps = ({ country }: IRootState) => ({
  countryEntity: country.entity,
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(CountryDetail);
