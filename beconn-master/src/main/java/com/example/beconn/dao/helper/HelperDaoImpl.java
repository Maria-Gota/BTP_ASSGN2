package com.example.beconn.dao.helper;

import com.example.beconn.entity.helper.Helper;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class HelperDaoImpl implements HelperDao {

    @PersistenceContext
    private EntityManager entityManager;

    @Override
    public List<Helper> getByCreatedBy(Long createdBy) {
        String getByCreatedBy = "SELECT x FROM Helper x WHERE x.createdBy =: createdBy";
        Query query = entityManager.createQuery(getByCreatedBy);
        query.setParameter("createdBy", createdBy);
        List<Helper> result = query.getResultList();
        return result;
    }

    @Override
    public List<Helper> getByCreatedByAndType(Long createdBy, String type) {
        String getByCreatedByAndType = "SELECT x FROM Helper x WHERE x.createdBy =: createdBy AND x.type =: type";
        Query query = entityManager.createQuery(getByCreatedByAndType);
        query.setParameter("createdBy", createdBy);
        query.setParameter("type", type);

        List<Helper> result = query.getResultList();
        return result;
    }

    @Override
    public Helper getById(Long id) {
        String getById = "SELECT x FROM Helper x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id", id);
        Helper helper = (Helper) query.getSingleResult();
        return helper;
    }

    @Override
    @Transactional
    public void create(Helper helper) {
        entityManager.persist(helper);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {
        Helper helper = getById(id);
        entityManager.remove(helper);
    }
}

