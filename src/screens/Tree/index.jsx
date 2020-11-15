import React from 'react';
import { TreeItem } from '../../components/TreeItem';
import Grid from '@material-ui/core/Grid';
import { SteppedLineTo } from 'react-lineto';
import { useSelector } from 'react-redux';

const MakeTree = ({ person, deep = 'tree0' }) => {
  const SteppedLineToStyle = {
    delay: true,
    borderColor: '#613B16',
    borderStyle: 'solid',
    borderWidth: 3,
    fromAnchor: 'bottom',
    toAnchor: 'top',
  };
  return (
    <Grid item xs={12} container className={deep}>
      <Grid
        item
        xs={12}
        container
        className={`${deep}s`}
        style={{ marginBottom: 30 }}
      >
        <TreeItem person={person} />
      </Grid>
      <Grid item xs={6} className={`${deep}f`}>
        {person.father && <MakeTree person={person.father} deep={`${deep}f`} />}
      </Grid>
      <Grid item xs={6} className={`${deep}m`}>
        {person.mother && <MakeTree person={person.mother} deep={`${deep}m`} />}
      </Grid>
      {person.father && (
        <SteppedLineTo
          from={`${deep}s`}
          to={`${deep}f`}
          {...SteppedLineToStyle}
        />
      )}
      {person.mother && (
        <SteppedLineTo
          from={`${deep}s`}
          to={`${deep}m`}
          {...SteppedLineToStyle}
        />
      )}
    </Grid>
  );
};
export const TreePage = () => {
  const firstPersonOnTreeData = useSelector(
    (state) => state.general.firstPersonOnTree
  );

  return firstPersonOnTreeData ? (
    <MakeTree person={firstPersonOnTreeData} />
  ) : null;
};
