package com.example.beconn.dao.formula;

import com.example.beconn.entity.Formula;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.Query;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FormulaDaoImpl implements FormulaDao {

    @PersistenceContext
    private EntityManager entityManager;


    @Override
    public List<Formula> getAll() {
        String getAll = "SELECT x FROM Formula x";
        Query query = entityManager.createQuery(getAll);
        List<Formula> result = query.getResultList();
        return result;
    }

    @Override
    public Formula getById(Long id) {

        String getById = "SELECT x FROM Formula x WHERE x.id =: id";
        Query query = entityManager.createQuery(getById);
        query.setParameter("id",id);
        Formula result = (Formula) query.getSingleResult();
        return result;
    }

    @Override
    public Formula getByName(String name) {

        String getByName = "SELECT x FROM Formula x WHERE x.name =: name";
        Query query = entityManager.createQuery(getByName);
        query.setParameter("name",name);
        Formula result = (Formula) query.getSingleResult();
        return result;
    }

    @Override
    public List<Formula> getByType(String type) {

        String getByType = "SELECT x FROM Formula x WHERE x.type =: type";
        Query query = entityManager.createQuery(getByType);
        query.setParameter("type",type);

        List<Formula> result = query.getResultList();
        return result;
    }

    @Override
    @Transactional
    public void create(Formula formula) {

        entityManager.persist(formula);
    }

    @Override
    @Transactional
    public void deleteById(Long id) {

        Formula formula = getById(id);
        entityManager.remove(formula);
    }

    @Override
    @Transactional
    public void deleteByName(String name) {

        Formula formula = getByName(name);
        entityManager.remove(formula);
    }

    @Override
    @Transactional
    public void deleteByType(String type) {

        List<Formula> formulaList = getByType(type);
        formulaList.forEach(formula -> {
            entityManager.remove(formula);
        });
    }
}
